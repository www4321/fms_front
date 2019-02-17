<template>
	<el-form ref="bill_form" :model="bill_form" :rules="bill_rules" label-width="80px"  style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="消费说明" prop="name">
			<el-input v-model="bill_form.name" type="text"></el-input>
		</el-form-item>
		<el-form-item label="消费类型">
			<el-select v-model="bill_form.type" placeholder="请选择消费类型">
				<el-option v-for="item in types" :key="item.type" :label="item.type" :value="item.type"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="消费金额" prop="money">
			<el-col :span="8">
			<el-input v-model="bill_form.money" type="number"></el-input>
			</el-col>
		</el-form-item>
		<el-form-item label="消费日期" prop="date">
			<el-col :span="11">
				<el-date-picker type="datetime" placeholder="选择日期" v-model="bill_form.date"  style="width: 100%;"></el-date-picker>
			</el-col>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click.native.prevent= onSubmit>立即创建</el-button>
			<el-button @click.native.prevent = onCancel>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
    import { getConsumeTypes,createConsumeBill } from '../../api/api';
    import {checkNumPot2} from '../../common/utils/rule'
	export default {
		data() {
			return {
                bill_form: {
					name:'',
					money: "0.0",
					type: '',
					date: '',
				},
                types:[],
                bill_rules:{
				    name:[
                        { required: true, message: '请输入', trigger: 'blur' },
					],
					money:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { validator: checkNumPot2 }
					],
					date:[
                        { required: true, message: '请输入日期', trigger: 'blur' },
					],
				},
				checked: true
			}
		},
		created: function () {
            this.getTypes();
        },
		methods: {
			onSubmit() {
				console.log('submit!');
                this.$refs.bill_form.validate((valid) => {
                    if(valid) {
                        let params = { type: this.bill_form.type, date: this.bill_form.date, description:this.bill_form.name, money:this.bill_form.money};
                        createConsumeBill((params)).then(result =>{
                            let { errCode, errMsg, data } = result;
                            if(errCode != 0){
                                console.log("http request err. errMsg:{}", errMsg)
                            } else {
                                this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                                this.$refs['bill_form'].resetFields();
                                console.log("http request success. result:{}", data)
                            }
                        })
					}
                })
			},
            onCancel(){
			    this.bill_form.name = "";
			    this.bill_form.type = "饮食";
			    this.bill_form.date = "";
			    this.bill_form.money = "0.0";
			},
			getTypes() {
                getConsumeTypes(null).then(result =>{
                    let { errCode, errMsg, data } = result;
                    if(errCode != 0){
                        console.log("http request err. errMsg:{}", errMsg)
                    } else {
                        data.forEach(item => {
                            let obj = {};
                            obj.type = item;
                            this.types.push(obj);
                        })
						this.bill_form.type = "饮食"
                    }
                })

			}
		}
	}

</script>