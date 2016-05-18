'use strict'

const config = require('../_config.js')

module.exports = require('yeoman-generator').Base.extend({
    paths() {
        config.paths.call(this)
    },

    prompting() {
        const done = this.async()

        const prompts = {
            default: this.config.get('template') || 0,
            message: 'Template?',
            name: 'template',
            type: 'list',

            choices: [{
                name: 'No',
                value: 'no'
            }, {
                name: 'Multi-Tic-Tac-Toe',
                value: 'multi-tic-tac-toe'
            }, {
                name: 'TodoMVC',
                value: 'todomvc'
            }]
        }

        this.prompt(prompts, (answers) => {
            this.config.set('core-version', 'generator-speedseed version 0.8.0')

            console.log(this.config.get('core-version'))

            this.props = this.props || {}

            for (let answer in answers) {
                this.config.set(answer, answers[answer])

                this.props[answer] = answers[answer]
            }

            done()
        })
    },

    end() {
        this.composeWith('speedseed:css')
        this.composeWith('speedseed:test')

        if (this.config.get('template') !== 'no') {
            this.composeWith('speedseed:framework')
        }

        const create = config.create.bind(this)
        // ROOTS
        create('seed/core', './.core', false)

        create('seed/babelrc', './.babelrc')
        create('seed/core-config.js', './.core-config.js')
        create('seed/editorconfig', './.editorconfig')
        create('seed/eslintrc', './.eslintrc')
        create('seed/gitignore', './.gitignore')

        create('seed/gulpfile.js', './gulpfile.js')
        create('seed/package.json', './package.json')
    }
})