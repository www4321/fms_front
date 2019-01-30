
<template>
    <textarea :id='tinymceId' :value='value'></textarea>
</template>

<script>
    // Import TinyMCE
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import 'tinymce/plugins/advlist' // 这几条引入是因为我的导入不了，不知道为啥
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/preview'
    import 'tinymce/plugins/print'
    import 'tinymce/plugins/save'
    import 'tinymce/plugins/searchreplace'
    import 'tinymce/plugins/spellchecker'
    import 'tinymce/plugins/tabfocus'
    import 'tinymce/plugins/template'
    import 'tinymce/plugins/textpattern'
    import 'tinymce/plugins/visualblocks'
    import 'tinymce/plugins/visualchars'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/insertdatetime'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/nonbreaking'
    import 'tinymce/plugins/noneditable'
    import 'tinymce/plugins/pagebreak'
    import 'tinymce/plugins/anchor'
    import 'tinymce/plugins/autolink'
    import 'tinymce/plugins/autosave'
    import 'tinymce/plugins/codesample'
    import 'tinymce/plugins/directionality'
    import 'tinymce/plugins/emoticons'
    import 'tinymce/plugins/fullscreen'
    import 'tinymce/plugins/hr'
    import 'tinymce/plugins/imagetools'
    import 'tinymce/plugins/importcss'
    import 'tinymce/plugins/contextmenu'

    import plugins from './plugins'
    import toolbar from './toolbar'

    export default {
        name: 'Tinymce',
        props: {
            id: {
                type: String,
                default: function() {
                    return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
                }
            },
            value: {
                type: String,
                default: ''
            },
            toolbar: {
                type: Array,
                required: false,
                default() {
                    return []
                }
            },
            menubar: {
                type: String,
                default: 'file edit insert view format table'
            },
            height: {
                type: Number,
                required: false,
                default: 360
            }
        },
        data() {
            return {
                hasChange: false,
                hasInit: false,
                tinymceId: this.id,
                fullscreen: false,
                languageTypeList: {
                    'en': 'en',
                    'zh': 'zh_CN'
                }
            }
        },
        computed: {
            language() {
                return this.languageTypeList[this.$store.getters.language]
            }
        },
        watch: {
            value(val) {
                if (!this.hasChange && this.hasInit) {
                    this.$nextTick(() =>
                        window.tinymce.get(this.tinymceId).setContent(val || ''))
                }
            },
            language() {
                this.destroyTinymce()
                this.$nextTick(() => this.initTinymce())
            }
        },
        mounted() {
            this.initTinymce()
        },
        activated() {
            this.initTinymce()
        },
        deactivated() {
            this.destroyTinymce()
        },
        destroyed() {
            this.destroyTinymce()
        },
        methods: {
            initTinymce() {
                const _this = this
                tinymce.init({
                    selector: `#${this.tinymceId}`,
                    relative_urls : false,
                    remove_script_host : false,
                    document_base_url: 'http://localhost:8080/static/',
                    language: this.language,
                    language_url: '/static/skins/zh_CN.js',
                    skin_url: '/static/skins/lightgray',
                    height: this.height,
                    body_class: 'panel-body ',
                    object_resizing: false,
                    toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                    menubar: this.menubar,
                    plugins: plugins,
                    end_container_on_empty_block: true,
                    powerpaste_word_import: 'clean',
                    code_dialog_height: 450,
                    code_dialog_width: 1000,
                    advlist_bullet_styles: 'square',
                    advlist_number_styles: 'default',
                    imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
                    default_link_target: '_blank',
                    link_title: false,
                    codesample_content_css:'/static/skins/codesample',
                    branding: false,//去除右下角的'由tinymce驱动'
                    nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                    init_instance_callback: editor => {
                        if (_this.value) {
                            editor.setContent(_this.value)
                        }
                        _this.hasInit = true
                        editor.on('NodeChange Change KeyUp SetContent', () => {
                            this.hasChange = true
                            this.$emit('input', editor.getContent())
                        })
                    },
                    setup(editor) {
                        editor.on('FullscreenStateChanged', (e) => {
                            _this.fullscreen = e.state
                        })
                    }
                })
            },
            destroyTinymce() {
                if (tinymce.get(this.tinymceId)) {
                    tinymce.get(this.tinymceId).destroy()

                }
            },
            setContent(value) {
                tinymce.get(this.tinymceId).setContent(value)
            },
            getContent() {
                tinymce.get(this.tinymceId).getContent()
            }
        }
    }
</script>

<style scoped>
    .tinymce-container {
        position: relative;
    }
    .tinymce-container>>>.mce-fullscreen {
        z-index: 10000;
    }
    .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
    }
    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
        /*z-index: 2005;*/
    }
    .fullscreen .editor-custom-btn-container {
        z-index: 10000;
        position: fixed;
    }
    .editor-upload-btn {
        display: inline-block;
    }
</style>
