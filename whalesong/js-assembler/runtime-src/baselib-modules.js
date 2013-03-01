/*jslint sub: true, vars: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*global plt*/

// Modules
(function (baselib, plt) {
    'use strict';
    var exports = {};
    baselib.modules = exports;

    var Namespace = function(modrec) {
        this.modrec = modrec;

        // string -> integer
        // Returns the position within the prefix that we should be looking.
        this.mapping = {}; 
        this.prefix = void(0);
        this.extra = {};
    };

    Namespace.prototype.get = function(name) {
        if (this.mapping.hasOwnProperty(name)) {
            return this.prefix[this.mapping[name]];
        }
        if (this.extra.hasOwnProperty(name)) {
            return this.extra[name];
        }
        return void(0);
    };

    Namespace.prototype.refreshPrefixMapping = function() {
        var prefix = this.modrec.prefix;
        var name;
        var i;
        for (i = 0; i < prefix.length; i++) {
            name = prefix.names[i];
            this.mapping[name] = i;
            if (this.extra.hasOwnProperty(name)) {
                prefix[i] = this.extra[name];
                delete this.extra[name];
            }
        }
        this.prefix = prefix;
    };

    Namespace.prototype.hasKey = function(name) {
        return this.mapping.hasOwnProperty(name);
    };

    Namespace.prototype.set = function(name, value) {
        if (this.mapping.hasOwnProperty(name)) {
            this.prefix[this.mapping[name]] = value;
            return;
        };
        if (this.extra.hasOwnProperty(name)) {
            this.extra[name] = value;
            return;
        }
        this.extra[name] = value;
        return;
    };

    var ModuleRecord = function (name, label) {
        this.name = name;
        this.label = label;
        this.isInvoked = false;
        this.prefix = false;
        this.namespace = new Namespace(this);

        // JavaScript-implemented code will assign privateExports
        // with all of the exported identifiers.
        this.privateExports = {};
    };

    // Returns the offset into the prefix in which the value will be stored.
    ModuleRecord.prototype.getPrefixOffset = function(externalName) {
        var i;
        for (i = 0; i < this.prefix.names.length; i++) {
            if (this.prefix.names[i] === externalName) {
                return i;
            }
        }
        return void(0);
    };

    // Returns access to the names defined in the module.
    ModuleRecord.prototype.getNamespace = function () {
        return this.namespace;
    };

    ModuleRecord.prototype.finalizeModuleInvokation = function () {
        this.namespace.refreshPrefixMapping();
    };
    

    // External invokation of a module.
    ModuleRecord.prototype.invoke = function (MACHINE, succ, fail) {
        this._invoke(false, MACHINE, succ, fail);
    };

    // Internal invokation of a module.
    ModuleRecord.prototype.internalInvoke = function (MACHINE, succ, fail) {
        this._invoke(true, MACHINE, succ, fail);
    };

    // Private: general invokation of a module
    ModuleRecord.prototype._invoke = function (isInternal, MACHINE, succ, fail) {
        var that = this;
        MACHINE = MACHINE || plt.runtime.currentMachine;
        succ = succ || function () {};
        fail = fail || function () {};

        var oldErrorHandler = MACHINE.params['currentErrorHandler'];
        var afterGoodInvoke = function (MACHINE) { 
            MACHINE.params['currentErrorHandler'] = oldErrorHandler;
            if (isInternal) { succ(); }
            else {
                throw new plt.runtime.HaltError(succ)
            }
        };

        if (this.isInvoked) {
            succ();
        } else {
            if (isInternal) {
                MACHINE.params['currentErrorHandler'] = function (MACHINE, anError) {
                    MACHINE.params['currentErrorHandler'] = oldErrorHandler;
                    fail(MACHINE, anError);
                };
                MACHINE.c.push(new plt.baselib.frames.CallFrame(afterGoodInvoke, null));
                throw that.label;
            } else {
                MACHINE.exclusiveLock.acquire(
                    void(0),
                    function(release) {
                        MACHINE.params['currentErrorHandler'] = function (MACHINE, anError) {
                            MACHINE.params['currentErrorHandler'] = oldErrorHandler;
                            fail(MACHINE, anError);
                        };
                        MACHINE.c.push(new plt.baselib.frames.CallFrame(afterGoodInvoke, null));
                        MACHINE._trampoline(that.label, false, release);
                    });
            }
        }
    };
    


    exports.ModuleRecord = ModuleRecord;


}(this.plt.baselib, this.plt));