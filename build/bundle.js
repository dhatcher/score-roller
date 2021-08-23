
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const SettingPreset = {
        NONE:"none",
        DEFAULT:"default",
        OLD_SCHOOL:"old_school",
        POINT_BUY:"point_buy",
        HERO:"hero"
    };

    const statsStore = writable({numberOfSets:0, totalCost:0});
    const notificationStore = writable(undefined);
    const settingsStore = createSettingsStore();
    const scoreStore = writable([
        {score:8, rolls:[], cost:0, bonus:-1},
        {score:8, rolls:[], cost:0, bonus:-1},
        {score:8, rolls:[], cost:0, bonus:-1},
        {score:8, rolls:[], cost:0, bonus:-1},
        {score:8, rolls:[], cost:0, bonus:-1},
        {score:8, rolls:[], cost:0, bonus:-1}
    ]);

    function createSettingsStore() {
        const {subscribe, set, update} = writable({
            preset:SettingPreset.DEFAULT,
            dicePerScore:4,
            allowNegativeCost:false,
            highScoreCost:2,
            minScore:3,
            maxScore:18,
            pointBuyMin:0,
            pointBuyMax:90
        });

        return {
            subscribe,
            set,
            update,
            preset: (presetType=SettingPreset.DEFAULT) => {
                switch (presetType) {
                    case SettingPreset.DEFAULT:
                        set({
                            preset:presetType,
                            dicePerScore:4,
                            allowNegativeCost:false,
                            highScoreCost:2,
                            minScore:3,
                            maxScore:18,
                            pointBuyMin:0,
                            pointBuyMax:90
                        });
                        break;
                    case SettingPreset.OLD_SCHOOL:
                        set({
                            preset:presetType,
                            dicePerScore:3,
                            allowNegativeCost:false,
                            highScoreCost:2,
                            minScore:3,
                            maxScore:18,
                            pointBuyMin:0,
                            pointBuyMax:90
                        });
                        break;
                    case SettingPreset.POINT_BUY:
                        set({
                            preset:presetType,
                            dicePerScore:4,
                            allowNegativeCost:false,
                            highScoreCost:2,
                            minScore:8,
                            maxScore:15,
                            pointBuyMin:27,
                            pointBuyMax:27
                        });
                        break;
                    case SettingPreset.HERO:
                        set({
                            preset:presetType,
                            dicePerScore:4,
                            allowNegativeCost:false,
                            highScoreCost:2,
                            minScore:10,
                            maxScore:18,
                            pointBuyMin:28,
                            pointBuyMax:90
                        });
                        break;
                }
            }
        }
    }

    /* src\Settings.svelte generated by Svelte v3.42.2 */
    const file$4 = "src\\Settings.svelte";

    // (182:0) {#if !showSettings}
    function create_if_block$1(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*settingsInfo*/ ctx[8]);
    			attr_dev(div, "class", "view svelte-1tqkvb6");
    			set_style(div, "font-size", "small");
    			add_location(div, file$4, 182, 4, 7458);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*settingsInfo*/ 256) set_data_dev(t, /*settingsInfo*/ ctx[8]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(182:0) {#if !showSettings}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let calcite_block;
    	let calcite_icon;
    	let t0;
    	let div1;
    	let calcite_label0;
    	let t1;
    	let calcite_radio_group0;
    	let calcite_radio_group_item0;
    	let t3;
    	let calcite_radio_group_item1;
    	let t5;
    	let calcite_label1;
    	let calcite_switch;
    	let t6;
    	let t7;
    	let calcite_label2;
    	let t8;
    	let calcite_radio_group1;
    	let calcite_radio_group_item2;
    	let t10;
    	let calcite_radio_group_item3;
    	let t12;
    	let div0;
    	let calcite_label3;
    	let t13;
    	let calcite_slider;
    	let t14;
    	let if_block_anchor;
    	let mounted;
    	let dispose;
    	let if_block = !/*showSettings*/ ctx[1] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			calcite_block = element("calcite-block");
    			calcite_icon = element("calcite-icon");
    			t0 = space();
    			div1 = element("div");
    			calcite_label0 = element("calcite-label");
    			t1 = text("Roll:\r\n            ");
    			calcite_radio_group0 = element("calcite-radio-group");
    			calcite_radio_group_item0 = element("calcite-radio-group-item");
    			calcite_radio_group_item0.textContent = "3d6";
    			t3 = space();
    			calcite_radio_group_item1 = element("calcite-radio-group-item");
    			calcite_radio_group_item1.textContent = "4d6 (drop the lowest)";
    			t5 = space();
    			calcite_label1 = element("calcite-label");
    			calcite_switch = element("calcite-switch");
    			t6 = text("\r\n            Scores below 8 have a negative cost.");
    			t7 = space();
    			calcite_label2 = element("calcite-label");
    			t8 = text("score above 15 cost:\r\n            ");
    			calcite_radio_group1 = element("calcite-radio-group");
    			calcite_radio_group_item2 = element("calcite-radio-group-item");
    			calcite_radio_group_item2.textContent = "1";
    			t10 = space();
    			calcite_radio_group_item3 = element("calcite-radio-group-item");
    			calcite_radio_group_item3.textContent = "2";
    			t12 = space();
    			div0 = element("div");
    			calcite_label3 = element("calcite-label");
    			t13 = text("Point Cost Range\r\n                ");
    			calcite_slider = element("calcite-slider");
    			t14 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			set_custom_element_data(calcite_icon, "slot", "icon");
    			set_custom_element_data(calcite_icon, "icon", "gear");
    			add_location(calcite_icon, file$4, 128, 4, 4179);
    			set_custom_element_data(calcite_radio_group_item0, "value", "3d6");
    			add_location(calcite_radio_group_item0, file$4, 150, 16, 5588);
    			set_custom_element_data(calcite_radio_group_item1, "value", "4d6");
    			set_custom_element_data(calcite_radio_group_item1, "checked", "");
    			add_location(calcite_radio_group_item1, file$4, 151, 16, 5707);
    			set_custom_element_data(calcite_radio_group0, "layout", "horizontal");
    			add_location(calcite_radio_group0, file$4, 149, 12, 5483);
    			set_custom_element_data(calcite_label0, "layout", "inline");
    			add_location(calcite_label0, file$4, 148, 8, 5433);
    			add_location(calcite_switch, file$4, 156, 12, 5963);
    			set_custom_element_data(calcite_label1, "layout", "inline");
    			add_location(calcite_label1, file$4, 155, 8, 5918);
    			set_custom_element_data(calcite_radio_group_item2, "value", "1");
    			add_location(calcite_radio_group_item2, file$4, 163, 16, 6364);
    			set_custom_element_data(calcite_radio_group_item3, "value", "2");
    			set_custom_element_data(calcite_radio_group_item3, "checked", "");
    			add_location(calcite_radio_group_item3, file$4, 164, 16, 6477);
    			set_custom_element_data(calcite_radio_group1, "layout", "horizontal");
    			add_location(calcite_radio_group1, file$4, 162, 12, 6256);
    			set_custom_element_data(calcite_label2, "layout", "inline");
    			add_location(calcite_label2, file$4, 161, 8, 6191);
    			set_custom_element_data(calcite_slider, "min", "0");
    			set_custom_element_data(calcite_slider, "min-value", "0");
    			set_custom_element_data(calcite_slider, "max", "90");
    			set_custom_element_data(calcite_slider, "max-value", "90");
    			set_custom_element_data(calcite_slider, "step", "1");
    			set_custom_element_data(calcite_slider, "label-handles", "");
    			set_custom_element_data(calcite_slider, "ticks", "15");
    			set_custom_element_data(calcite_slider, "snap", "");
    			add_location(calcite_slider, file$4, 174, 16, 7131);
    			add_location(calcite_label3, file$4, 172, 12, 7064);
    			set_style(div0, "width", "95%");
    			add_location(div0, file$4, 171, 8, 7026);
    			attr_dev(div1, "class", "view svelte-1tqkvb6");
    			add_location(div1, file$4, 129, 4, 4238);
    			set_custom_element_data(calcite_block, "heading", "Settings");
    			set_custom_element_data(calcite_block, "open", /*showSettings*/ ctx[1]);
    			set_custom_element_data(calcite_block, "collapsible", "");
    			add_location(calcite_block, file$4, 126, 0, 4004);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, calcite_block, anchor);
    			append_dev(calcite_block, calcite_icon);
    			append_dev(calcite_block, t0);
    			append_dev(calcite_block, div1);
    			append_dev(div1, calcite_label0);
    			append_dev(calcite_label0, t1);
    			append_dev(calcite_label0, calcite_radio_group0);
    			append_dev(calcite_radio_group0, calcite_radio_group_item0);
    			/*calcite_radio_group_item0_binding*/ ctx[13](calcite_radio_group_item0);
    			append_dev(calcite_radio_group0, t3);
    			append_dev(calcite_radio_group0, calcite_radio_group_item1);
    			/*calcite_radio_group_item1_binding*/ ctx[14](calcite_radio_group_item1);
    			append_dev(div1, t5);
    			append_dev(div1, calcite_label1);
    			append_dev(calcite_label1, calcite_switch);
    			/*calcite_switch_binding*/ ctx[15](calcite_switch);
    			append_dev(calcite_label1, t6);
    			append_dev(div1, t7);
    			append_dev(div1, calcite_label2);
    			append_dev(calcite_label2, t8);
    			append_dev(calcite_label2, calcite_radio_group1);
    			append_dev(calcite_radio_group1, calcite_radio_group_item2);
    			/*calcite_radio_group_item2_binding*/ ctx[16](calcite_radio_group_item2);
    			append_dev(calcite_radio_group1, t10);
    			append_dev(calcite_radio_group1, calcite_radio_group_item3);
    			/*calcite_radio_group_item3_binding*/ ctx[17](calcite_radio_group_item3);
    			append_dev(div1, t12);
    			append_dev(div1, div0);
    			append_dev(div0, calcite_label3);
    			append_dev(calcite_label3, t13);
    			append_dev(calcite_label3, calcite_slider);
    			/*calcite_slider_binding*/ ctx[18](calcite_slider);
    			/*calcite_block_binding*/ ctx[19](calcite_block);
    			insert_dev(target, t14, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(calcite_radio_group0, "calciteRadioGroupChange", /*diceNumberChange*/ ctx[9], false, false, false),
    					listen_dev(calcite_switch, "calciteSwitchChange", /*negativeSwitchChange*/ ctx[10], false, false, false),
    					listen_dev(calcite_radio_group1, "calciteRadioGroupChange", /*highScoreCostChange*/ ctx[11], false, false, false),
    					listen_dev(calcite_slider, "calciteSliderChange", /*minMaxCostChange*/ ctx[12], false, false, false),
    					listen_dev(calcite_block, "calciteBlockToggle", /*calciteBlockToggle_handler*/ ctx[20], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*showSettings*/ 2) {
    				set_custom_element_data(calcite_block, "open", /*showSettings*/ ctx[1]);
    			}

    			if (!/*showSettings*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(calcite_block);
    			/*calcite_radio_group_item0_binding*/ ctx[13](null);
    			/*calcite_radio_group_item1_binding*/ ctx[14](null);
    			/*calcite_switch_binding*/ ctx[15](null);
    			/*calcite_radio_group_item2_binding*/ ctx[16](null);
    			/*calcite_radio_group_item3_binding*/ ctx[17](null);
    			/*calcite_slider_binding*/ ctx[18](null);
    			/*calcite_block_binding*/ ctx[19](null);
    			if (detaching) detach_dev(t14);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(21, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	let settingsBlock;
    	let showSettings = false;

    	let noneRadioButton,
    		oldschoolRadioButton,
    		defaultRadioButton,
    		pointBuyRadioButton,
    		heroRadioButton;

    	let threeDSixRadioButton, fourDSixButton;
    	let allowNegativeSwitch;
    	let highScoreOneButton, highScoreTwoButton;
    	let minMaxCostSlider;
    	let minMaxScoreSlider;
    	let settingsInfo = `Rolling 4d6. < 8 cost 0. > 15 cost 2.`;

    	// let unsubscribe;
    	onMount(() => {
    		
    	}); // unsubscribe = settingsStore.subscribe(store => {
    	//     switch (store.preset) {
    	//         case SettingPreset.NONE: noneRadioButton.checked = true;
    	//             break;

    	//         case SettingPreset.DEFAULT: defaultRadioButton.checked = true;
    	//             break;
    	//         case SettingPreset.OLD_SCHOOL: oldschoolRadioButton.checked = true;
    	//             break;
    	//         case SettingPreset.POINT_BUY: pointBuyRadioButton.checked = true;
    	//             break;
    	//         case SettingPreset.HERO: heroRadioButton.checked = true;
    	//             break;
    	//     }
    	//     if(store.dicePerScore === 3){
    	//         threeDSixRadioButton.checked = true;
    	//     } else {
    	//         fourDSixButton.checked = true;
    	//     }
    	// });
    	function updateSettingInfo() {
    		if ($settingsStore.dicePerScore === 3) {
    			$$invalidate(8, settingsInfo = "Rolling 3d6. ");
    		} else {
    			$$invalidate(8, settingsInfo = "Rolling 4d6. ");
    		}

    		if ($settingsStore.allowNegativeCost) {
    			$$invalidate(8, settingsInfo += "< 8 reduce cost. ");
    		} else {
    			$$invalidate(8, settingsInfo += "< 8 cost 0. ");
    		}

    		$$invalidate(8, settingsInfo += `> 15 cost ${$settingsStore.highScoreCost}. `);

    		if ($settingsStore.pointBuyMin > 0 || $settingsStore.pointBuyMax < 90) {
    			$$invalidate(8, settingsInfo += `Point cost between ${$settingsStore.pointBuyMin} and ${$settingsStore.pointBuyMax}.`);
    		}
    	}

    	// onDestroy(unsubscribe);
    	function presetChange(ev) {
    		settingsStore.preset(ev.detail);
    	}

    	function diceNumberChange(ev) {
    		// noneRadioButton.checked = true;
    		settingsStore.update(store => {
    			store.dicePerScore = ev.detail === "3d6" ? 3 : 4;
    			return { ...store };
    		});

    		updateSettingInfo();
    	}

    	function negativeSwitchChange(ev) {
    		// noneRadioButton.checked = true;
    		settingsStore.update(store => {
    			store.allowNegativeCost = allowNegativeSwitch.switched;
    			return { ...store };
    		});

    		updateSettingInfo();
    	}

    	function highScoreCostChange(ev) {
    		// noneRadioButton.checked = true;
    		settingsStore.update(store => {
    			store.highScoreCost = ev.detail === "1" ? 1 : 2;

    			if (minMaxCostSlider.minValue > 72 && store.highScoreCost == 1) {
    				$$invalidate(7, minMaxCostSlider.minValue = 72, minMaxCostSlider);
    			}

    			return { ...store };
    		});

    		updateSettingInfo();
    	}

    	function minMaxCostChange(ev) {
    		settingsStore.update(store => {
    			if (minMaxCostSlider.minValue > 72 && store.highScoreCost == 1) {
    				$$invalidate(7, minMaxCostSlider.minValue = 72, minMaxCostSlider);
    			}

    			store.pointBuyMin = minMaxCostSlider.minValue;
    			store.pointBuyMax = minMaxCostSlider.maxValue;
    			return { ...store };
    		});

    		updateSettingInfo();
    	}

    	function minMaxScoreChange(ev) {
    		settingsStore.update(store => {
    			store.minScore = minMaxScoreSlider.min;
    			store.maxScore = minMaxScoreSlider.max;
    			return { ...store };
    		});
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	function calcite_radio_group_item0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			threeDSixRadioButton = $$value;
    			$$invalidate(2, threeDSixRadioButton);
    		});
    	}

    	function calcite_radio_group_item1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			fourDSixButton = $$value;
    			$$invalidate(3, fourDSixButton);
    		});
    	}

    	function calcite_switch_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			allowNegativeSwitch = $$value;
    			$$invalidate(4, allowNegativeSwitch);
    		});
    	}

    	function calcite_radio_group_item2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			highScoreOneButton = $$value;
    			$$invalidate(5, highScoreOneButton);
    		});
    	}

    	function calcite_radio_group_item3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			highScoreTwoButton = $$value;
    			$$invalidate(6, highScoreTwoButton);
    		});
    	}

    	function calcite_slider_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			minMaxCostSlider = $$value;
    			$$invalidate(7, minMaxCostSlider);
    		});
    	}

    	function calcite_block_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			settingsBlock = $$value;
    			$$invalidate(0, settingsBlock);
    		});
    	}

    	const calciteBlockToggle_handler = () => $$invalidate(1, showSettings = !showSettings);

    	$$self.$capture_state = () => ({
    		settingsStore,
    		onDestroy,
    		onMount,
    		settingsBlock,
    		showSettings,
    		noneRadioButton,
    		oldschoolRadioButton,
    		defaultRadioButton,
    		pointBuyRadioButton,
    		heroRadioButton,
    		threeDSixRadioButton,
    		fourDSixButton,
    		allowNegativeSwitch,
    		highScoreOneButton,
    		highScoreTwoButton,
    		minMaxCostSlider,
    		minMaxScoreSlider,
    		settingsInfo,
    		updateSettingInfo,
    		presetChange,
    		diceNumberChange,
    		negativeSwitchChange,
    		highScoreCostChange,
    		minMaxCostChange,
    		minMaxScoreChange,
    		$settingsStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('settingsBlock' in $$props) $$invalidate(0, settingsBlock = $$props.settingsBlock);
    		if ('showSettings' in $$props) $$invalidate(1, showSettings = $$props.showSettings);
    		if ('noneRadioButton' in $$props) noneRadioButton = $$props.noneRadioButton;
    		if ('oldschoolRadioButton' in $$props) oldschoolRadioButton = $$props.oldschoolRadioButton;
    		if ('defaultRadioButton' in $$props) defaultRadioButton = $$props.defaultRadioButton;
    		if ('pointBuyRadioButton' in $$props) pointBuyRadioButton = $$props.pointBuyRadioButton;
    		if ('heroRadioButton' in $$props) heroRadioButton = $$props.heroRadioButton;
    		if ('threeDSixRadioButton' in $$props) $$invalidate(2, threeDSixRadioButton = $$props.threeDSixRadioButton);
    		if ('fourDSixButton' in $$props) $$invalidate(3, fourDSixButton = $$props.fourDSixButton);
    		if ('allowNegativeSwitch' in $$props) $$invalidate(4, allowNegativeSwitch = $$props.allowNegativeSwitch);
    		if ('highScoreOneButton' in $$props) $$invalidate(5, highScoreOneButton = $$props.highScoreOneButton);
    		if ('highScoreTwoButton' in $$props) $$invalidate(6, highScoreTwoButton = $$props.highScoreTwoButton);
    		if ('minMaxCostSlider' in $$props) $$invalidate(7, minMaxCostSlider = $$props.minMaxCostSlider);
    		if ('minMaxScoreSlider' in $$props) minMaxScoreSlider = $$props.minMaxScoreSlider;
    		if ('settingsInfo' in $$props) $$invalidate(8, settingsInfo = $$props.settingsInfo);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		settingsBlock,
    		showSettings,
    		threeDSixRadioButton,
    		fourDSixButton,
    		allowNegativeSwitch,
    		highScoreOneButton,
    		highScoreTwoButton,
    		minMaxCostSlider,
    		settingsInfo,
    		diceNumberChange,
    		negativeSwitchChange,
    		highScoreCostChange,
    		minMaxCostChange,
    		calcite_radio_group_item0_binding,
    		calcite_radio_group_item1_binding,
    		calcite_switch_binding,
    		calcite_radio_group_item2_binding,
    		calcite_radio_group_item3_binding,
    		calcite_slider_binding,
    		calcite_block_binding,
    		calciteBlockToggle_handler
    	];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\AbilityScore.svelte generated by Svelte v3.42.2 */
    const file$3 = "src\\AbilityScore.svelte";

    function create_fragment$3(ctx) {
    	let div3;
    	let div0;
    	let t0_value = /*abilityScore*/ ctx[0].score + "";
    	let t0;
    	let t1;
    	let t2_value = /*abilityScore*/ ctx[0].bonus + "";
    	let t2;
    	let t3;
    	let t4;
    	let div1;
    	let t5;
    	let t6;
    	let div2;
    	let t7;
    	let span;
    	let t8_value = /*abilityScore*/ ctx[0].cost + "";
    	let t8;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text(" (");
    			t2 = text(t2_value);
    			t3 = text(")");
    			t4 = space();
    			div1 = element("div");
    			t5 = text(/*diceBreakdown*/ ctx[1]);
    			t6 = space();
    			div2 = element("div");
    			t7 = text("point buy cost ");
    			span = element("span");
    			t8 = text(t8_value);
    			attr_dev(div0, "class", "view-section svelte-1bmzjkl");
    			set_style(div0, "width", "4em");
    			set_style(div0, "font-weight", "bold");
    			set_style(div0, "font-size", "large");
    			add_location(div0, file$3, 40, 4, 887);
    			attr_dev(div1, "class", "view-section svelte-1bmzjkl");
    			add_location(div1, file$3, 41, 4, 1024);
    			set_style(span, "padding-left", "4px");
    			add_location(span, file$3, 42, 45, 1118);
    			attr_dev(div2, "class", "view-section svelte-1bmzjkl");
    			add_location(div2, file$3, 42, 4, 1077);
    			attr_dev(div3, "class", "view svelte-1bmzjkl");
    			add_location(div3, file$3, 39, 0, 863);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div3, t4);
    			append_dev(div3, div1);
    			append_dev(div1, t5);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, t7);
    			append_dev(div2, span);
    			append_dev(span, t8);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*abilityScore*/ 1 && t0_value !== (t0_value = /*abilityScore*/ ctx[0].score + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*abilityScore*/ 1 && t2_value !== (t2_value = /*abilityScore*/ ctx[0].bonus + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*diceBreakdown*/ 2) set_data_dev(t5, /*diceBreakdown*/ ctx[1]);
    			if (dirty & /*abilityScore*/ 1 && t8_value !== (t8_value = /*abilityScore*/ ctx[0].cost + "")) set_data_dev(t8, t8_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AbilityScore', slots, []);
    	let { abilityScore } = $$props;
    	let diceBreakdown = "";
    	onMount(updateUI);

    	function updateUI() {
    		$$invalidate(1, diceBreakdown = abilityScore.rolls.join(" + "));

    		if (abilityScore.rolls.length === 4) {
    			$$invalidate(1, diceBreakdown += ` (drop ${abilityScore.rolls[3]})`);
    		}
    	}

    	
    	const writable_props = ['abilityScore'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AbilityScore> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('abilityScore' in $$props) $$invalidate(0, abilityScore = $$props.abilityScore);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		abilityScore,
    		diceBreakdown,
    		updateUI
    	});

    	$$self.$inject_state = $$props => {
    		if ('abilityScore' in $$props) $$invalidate(0, abilityScore = $$props.abilityScore);
    		if ('diceBreakdown' in $$props) $$invalidate(1, diceBreakdown = $$props.diceBreakdown);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [abilityScore, diceBreakdown];
    }

    class AbilityScore extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { abilityScore: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbilityScore",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*abilityScore*/ ctx[0] === undefined && !('abilityScore' in props)) {
    			console.warn("<AbilityScore> was created without expected prop 'abilityScore'");
    		}
    	}

    	get abilityScore() {
    		throw new Error("<AbilityScore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set abilityScore(value) {
    		throw new Error("<AbilityScore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Roller.svelte generated by Svelte v3.42.2 */
    const file$2 = "src\\Roller.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (93:4) {#each $scoreStore as abilityScore, i (abilityScore)}
    function create_each_block(key_1, ctx) {
    	let first;
    	let abilityscore;
    	let current;

    	abilityscore = new AbilityScore({
    			props: { abilityScore: /*abilityScore*/ ctx[5] },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(abilityscore.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(abilityscore, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const abilityscore_changes = {};
    			if (dirty & /*$scoreStore*/ 1) abilityscore_changes.abilityScore = /*abilityScore*/ ctx[5];
    			abilityscore.$set(abilityscore_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abilityscore.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abilityscore.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(abilityscore, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(93:4) {#each $scoreStore as abilityScore, i (abilityScore)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div1;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t0;
    	let div0;
    	let calcite_button;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*$scoreStore*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*abilityScore*/ ctx[5];
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div0 = element("div");
    			calcite_button = element("calcite-button");
    			calcite_button.textContent = "ROLL";
    			set_custom_element_data(calcite_button, "width", "full");
    			add_location(calcite_button, file$2, 96, 8, 3226);
    			set_style(div0, "margin", "2px");
    			add_location(div0, file$2, 95, 4, 3191);
    			attr_dev(div1, "class", "view svelte-8rwd3p");
    			add_location(div1, file$2, 91, 0, 3055);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, calcite_button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(calcite_button, "click", /*rollScores*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$scoreStore*/ 1) {
    				each_value = /*$scoreStore*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, outro_and_destroy_block, create_each_block, t0, get_each_context);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function rollDie(sides = 6) {
    	return Math.ceil(Math.random() * sides);
    }

    function calculateScoreBonus(score) {
    	let bonus = -5 + Math.floor(score / 2);
    	bonus = bonus > 0 ? `+${bonus}` : `${bonus}`;
    	return bonus;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	let $scoreStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(2, $settingsStore = $$value));
    	validate_store(scoreStore, 'scoreStore');
    	component_subscribe($$self, scoreStore, $$value => $$invalidate(0, $scoreStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Roller', slots, []);

    	function rollScores() {
    		scoreStore.update(abilityScores => {
    			let newScores = [];
    			let keepRolling = true;
    			let numberOfSetsRolled = 0;

    			while (keepRolling) {
    				newScores = [];

    				abilityScores.forEach(score => {
    					let abilityScore = rollDice();

    					while (abilityScore.score < $settingsStore.minScore || abilityScore.score > $settingsStore.maxScore) {
    						abilityScore = rollDice();
    					}

    					newScores.push(abilityScore);
    				});

    				numberOfSetsRolled++;
    				let costTotal = newScores.map(as => as.cost).reduce((acc, cur) => acc + cur);

    				if (costTotal >= $settingsStore.pointBuyMin && costTotal <= $settingsStore.pointBuyMax) {
    					keepRolling = false;

    					statsStore.set({
    						numberOfSets: numberOfSetsRolled,
    						totalCost: costTotal
    					});
    				} else if (numberOfSetsRolled >= 1000000) {
    					keepRolling = false;

    					statsStore.set({
    						numberOfSets: numberOfSetsRolled,
    						totalCost: costTotal
    					});

    					notificationStore.set('failure');
    				}
    			}

    			return [...newScores];
    		});
    	}

    	function rollDice(sides = 6, dropLowest = true) {
    		let rolls = [];

    		for (const die of Array($settingsStore.dicePerScore).keys()) {
    			rolls.push(rollDie(sides));
    		}

    		rolls.sort((a, b) => b - a);
    		let score = 0;

    		for (let i = 0; i < 3; i++) {
    			score += rolls[i];
    		}

    		let cost = calculatePointBuyCost(score);
    		let bonus = calculateScoreBonus(score);
    		return { rolls, score, cost, bonus };
    	}

    	function calculatePointBuyCost(score) {
    		let cost = 0;

    		if (score < 8) {
    			if ($settingsStore.allowNegativeCost) {
    				cost = score - 8;
    			}
    		} else if (score <= 13) {
    			cost = score - 8;
    		} else if (score <= 15) {
    			cost = 5 + (score - 13) * 2;
    		} else {
    			cost = 9 + (score - 15) * $settingsStore.highScoreCost;
    		}

    		return cost;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Roller> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		notificationStore,
    		scoreStore,
    		settingsStore,
    		statsStore,
    		AbilityScore,
    		rollScores,
    		rollDie,
    		rollDice,
    		calculateScoreBonus,
    		calculatePointBuyCost,
    		$settingsStore,
    		$scoreStore
    	});

    	return [$scoreStore, rollScores];
    }

    class Roller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Roller",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Stats.svelte generated by Svelte v3.42.2 */
    const file$1 = "src\\Stats.svelte";

    function create_fragment$1(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let span;
    	let t1_value = /*$statsStore*/ ctx[0].numberOfSets + "";
    	let t1;
    	let t2;
    	let t3;
    	let div1;
    	let t4;
    	let t5_value = /*$statsStore*/ ctx[0].totalCost + "";
    	let t5;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text("Created ");
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = text(" set(s) to match.");
    			t3 = space();
    			div1 = element("div");
    			t4 = text("Point Buy Cost: ");
    			t5 = text(t5_value);
    			set_style(span, "font-weight", "bold");
    			add_location(span, file$1, 14, 17, 233);
    			add_location(div0, file$1, 14, 4, 220);
    			add_location(div1, file$1, 15, 4, 328);
    			attr_dev(div2, "class", "view svelte-11v6m7k");
    			add_location(div2, file$1, 13, 0, 196);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div0, span);
    			append_dev(span, t1);
    			append_dev(div0, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, t4);
    			append_dev(div1, t5);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$statsStore*/ 1 && t1_value !== (t1_value = /*$statsStore*/ ctx[0].numberOfSets + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*$statsStore*/ 1 && t5_value !== (t5_value = /*$statsStore*/ ctx[0].totalCost + "")) set_data_dev(t5, t5_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $statsStore;
    	validate_store(statsStore, 'statsStore');
    	component_subscribe($$self, statsStore, $$value => $$invalidate(0, $statsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Stats', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Stats> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ statsStore, $statsStore });
    	return [$statsStore];
    }

    class Stats extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Stats",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.42.2 */
    const file = "src\\App.svelte";

    // (39:8) {#if $notificationStore}
    function create_if_block(ctx) {
    	let calcite_alert;
    	let div0;
    	let t1;
    	let div1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			calcite_alert = element("calcite-alert");
    			div0 = element("div");
    			div0.textContent = "Unable to create Scores";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "We tried 1 million times but couldn't get a set of scores to match your settings. Change\n                    the settings and try again.";
    			attr_dev(div0, "slot", "title");
    			add_location(div0, file, 41, 16, 1139);
    			attr_dev(div1, "slot", "message");
    			add_location(div1, file, 42, 16, 1203);
    			set_custom_element_data(calcite_alert, "icon", "");
    			set_custom_element_data(calcite_alert, "active", "");
    			set_custom_element_data(calcite_alert, "dismissible", "");
    			set_custom_element_data(calcite_alert, "scale", "s");
    			set_custom_element_data(calcite_alert, "width", "half");
    			set_custom_element_data(calcite_alert, "color", "blue");
    			set_custom_element_data(calcite_alert, "class", "svelte-1qdki6i");
    			add_location(calcite_alert, file, 39, 12, 957);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, calcite_alert, anchor);
    			append_dev(calcite_alert, div0);
    			append_dev(calcite_alert, t1);
    			append_dev(calcite_alert, div1);

    			if (!mounted) {
    				dispose = listen_dev(calcite_alert, "calciteAlertClose", /*calciteAlertClose_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(calcite_alert);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(39:8) {#if $notificationStore}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let header;
    	let div0;
    	let h3;
    	let t1;
    	let main;
    	let div1;
    	let settings;
    	let t2;
    	let roller;
    	let t3;
    	let stats;
    	let t4;
    	let current;
    	settings = new Settings({ $$inline: true });
    	roller = new Roller({ $$inline: true });
    	stats = new Stats({ $$inline: true });
    	let if_block = /*$notificationStore*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			header = element("header");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "5e Ability Score Roller";
    			t1 = space();
    			main = element("main");
    			div1 = element("div");
    			create_component(settings.$$.fragment);
    			t2 = space();
    			create_component(roller.$$.fragment);
    			t3 = space();
    			create_component(stats.$$.fragment);
    			t4 = space();
    			if (if_block) if_block.c();
    			add_location(h3, file, 28, 8, 722);
    			set_style(div0, "text-align", "center");
    			set_style(div0, "justify-content", "center");
    			add_location(div0, file, 27, 4, 655);
    			attr_dev(header, "class", "" + (null_to_empty(theme) + " svelte-1qdki6i"));
    			add_location(header, file, 26, 0, 626);
    			set_style(div1, "display", "flex");
    			set_style(div1, "flex-direction", "column");
    			add_location(div1, file, 34, 4, 805);
    			attr_dev(main, "class", "" + (null_to_empty(theme) + " svelte-1qdki6i"));
    			add_location(main, file, 33, 0, 778);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);
    			append_dev(div0, h3);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			mount_component(settings, div1, null);
    			append_dev(div1, t2);
    			mount_component(roller, div1, null);
    			append_dev(div1, t3);
    			mount_component(stats, div1, null);
    			append_dev(div1, t4);
    			if (if_block) if_block.m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$notificationStore*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(settings.$$.fragment, local);
    			transition_in(roller.$$.fragment, local);
    			transition_in(stats.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(settings.$$.fragment, local);
    			transition_out(roller.$$.fragment, local);
    			transition_out(stats.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			destroy_component(settings);
    			destroy_component(roller);
    			destroy_component(stats);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const theme = "calcite-theme-light";

    function instance($$self, $$props, $$invalidate) {
    	let $notificationStore;
    	validate_store(notificationStore, 'notificationStore');
    	component_subscribe($$self, notificationStore, $$value => $$invalidate(0, $notificationStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let notification = undefined;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const calciteAlertClose_handler = () => notificationStore.set(undefined);

    	$$self.$capture_state = () => ({
    		SvelteComponent: SvelteComponentDev,
    		Settings,
    		Roller,
    		Stats,
    		notificationStore,
    		theme,
    		notification,
    		$notificationStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('notification' in $$props) notification = $$props.notification;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$notificationStore, calciteAlertClose_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    let app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
