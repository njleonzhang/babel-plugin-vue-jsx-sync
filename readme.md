# babel-plugin-vue-jsx-sync
> jsx plugin for vue [sync modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier), inspired by [babel-plugin-jsx-v-model](https://github.com/nickmessing/babel-plugin-jsx-v-model)

* [Demo](https://njleonzhang.github.io/babel-plugin-vue-jsx-sync/.)

# Usage

* install
```
yarn add -D babel-plugin-vue-jsx-sync
or 
npm install babel-plugin-vue-jsx-sync --save-dev
```

* add the plugin to `.babelrc`
```
{
  "presets": [
    ["env", {
      "modules": false
    }],
    "stage-2"
  ],
  "plugins": ["transform-runtime", "vue-jsx-sync", "transform-vue-jsx"],
  ......
}
}
```

* use in jsx

```
function a() {
  return (
    <div>
      <component visible$sync={this.test}>I am newbie</component>
    </div>
  )
}

```
> Notice: we need to use `visible$sync` instead of `visible.sync`, because `visible.sync` is an illegal syntax in `jsx`. 

is complied to:

```
function a() {
  return h(
    "div",
    null,
    [h(
      "component",
      {
        attrs: { visible: this.test },
        on: {
          "update:visible": $$val => {
            this.test = $$val;
          }
        }
      },
      ["I am newbie"]
    )]
  );
}
```

# dev

```
npm install -g parcel-bundler
npm install
npm run dev
```

# build doc

```
npm run doc
```
