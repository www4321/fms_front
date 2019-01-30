<!--<template>-->
	<!--<div class='tinymce'>-->
		<!--<h1>tinymce</h1>-->
		<!--<editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>-->
		<!--<div v-html='tinymceHtml'></div>-->
	<!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import tinymce from 'tinymce/tinymce'-->
    <!--import 'tinymce/themes/modern/theme'-->
    <!--import Editor from '@tinymce/tinymce-vue'-->
    <!--import 'tinymce/plugins/image'-->
    <!--import 'tinymce/plugins/link'-->
    <!--import 'tinymce/plugins/code'-->
    <!--import 'tinymce/plugins/table'-->
    <!--import 'tinymce/plugins/lists'-->
    <!--import 'tinymce/plugins/contextmenu'-->
    <!--import 'tinymce/plugins/wordcount'-->
    <!--import 'tinymce/plugins/colorpicker'-->
    <!--import 'tinymce/plugins/textcolor'-->
    <!--export default {-->
        <!--name: 'tinymce',-->
        <!--data () {-->
            <!--return {-->
                <!--tinymceHtml: '请输入内容',-->
                <!--init: {-->
                    <!--language_url: '/static/langs/zh_CN.js',-->
                    <!--language: 'zh_CN',-->
                    <!--skin_url: '/static/skins/lightgray',-->
                    <!--height: 300,-->
                    <!--plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',-->
                    <!--toolbar:-->
                        <!--'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',-->
                    <!--branding: false-->
                <!--}-->
            <!--}-->
        <!--},-->
        <!--mounted () {-->
            <!--tinymce.init({})-->
        <!--},-->
        <!--components: {Editor}-->
    <!--}-->
<!--</script>-->


<template>
	<div class="app-container calendar-list-container">
		<div style="margin:0 5%; width: 90%;">
			<editor></editor>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
    import editor from '../../components/Tinymce/Tinymce' // 根据editor.vue组件位置引入
    export default {
        data() {
            return {

            }
        },
        components: { // 引入组件
            editor
        },
        methods: {

        }
    }
</script>
<style scoped >

</style>