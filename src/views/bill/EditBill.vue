<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="edit_bill_form">
				<el-form-item label="年份">
					<el-select v-model="edit_bill_form.year" placeholder="请选择年份">
						<el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="月份">
					<el-select v-model="edit_bill_form.month" placeholder="请选择月份">
						<el-option v-for="item in months" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getBills">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="bills" highlight-current-row v-loading="listLoading" @selection-change="selectsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column  prop="id" min-width="60" label="id" >
			</el-table-column>
			<el-table-column prop="consumeType" label="消费类型" min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="money" label="消费金额" min-width="100"  sortable>
			</el-table-column>
			<el-table-column prop="consumeInfo" label="消费说明" min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="consumeCreate" label="消费日期" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="consumeUpdate" label="更新日期" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.selects.length===0">批量删除</el-button>
			<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[5, 10, 20, 40]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
					style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="消费说明" prop="name">
					<el-input v-model="editForm.name" type="text"></el-input>
				</el-form-item>
				<el-form-item label="消费类型">
					<el-select v-model="editForm.type" placeholder="请选择消费类型">
						<el-option v-for="item in types" :key="item.type" :label="item.type" :value="item.type"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消费金额" prop="money">
					<el-col :span="8">
						<el-input v-model="editForm.money" type="number"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="消费日期" prop="date">
					<el-col :span="11">
						<el-date-picker type="datetime" placeholder="选择日期" v-model="editForm.date"  style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增"  :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="消费说明" prop="name">
					<el-input v-model="addForm.name" type="text"></el-input>
				</el-form-item>
				<el-form-item label="消费类型">
					<el-select v-model="addForm.type" placeholder="请选择消费类型">
						<el-option v-for="item in types" :key="item.type" :label="item.type" :value="item.type"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="消费金额" prop="money">
					<el-col :span="8">
						<el-input v-model="addForm.money" type="number"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="消费日期" prop="date">
					<el-col :span="11">
						<el-date-picker type="datetime" placeholder="选择日期" v-model="addForm.date"  style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import { getConsumeBillListPage,getConsumeTypes, removeBill, batchRemoveBill,createConsumeBill, updateConsumeBill } from '../../api/api';

	export default {
		data() {
			return {
                edit_bill_form: {
					year:"",
					month:1,
				},
                years:[],
                months:[1,2,3,4,5,6,7,8,9,11,12],
                bills: [],
				types:[],
				total: 0,
                currentPage: 1,
				pageSize:10,
				listLoading: false,
				selects: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
                    name:[
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    money:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                    ],
                    date:[
                        { required: true, message: '请输入日期', trigger: 'blur' },
                    ],
				},
				//编辑界面数据
				editForm: {
                    name:'',
                    money: "0.0",
                    type: '',
                    date: '',
					id:'',
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
                    name:[
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    money:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                    ],
                    date:[
                        { required: true, message: '请输入日期', trigger: 'blur' },
                    ],
				},
				//新增界面数据
				addForm: {
                    name:'',
                    money: "0.0",
                    type: '',
                    date: '',
				}

			}
		},
		methods: {
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                console.log("handleSizeChange:",val,"currentPage:",this.currentPage)
                this.getBillList(1);
			},
			handleCurrentChange(val) {
                console.log("handleCurrentChange:",val)
				this.getBillList(val);
			},
			//获取用户列表
            getBills(){
                this.currentPage = 1;
                this.getBillList(this.currentPage);
			},
            getBillList(currentPage) {
				let param = {
					page: currentPage,
					pageSize: this.pageSize,
					year:this.edit_bill_form.year,
					month:this.edit_bill_form.month,
				};
				// console.log("request params:{}",param)

				getConsumeBillListPage(param).then((res) => {
                    let { errCode, errMsg, list, pagination } = res;
                    if(errCode != 0){
                        console.log("http request err. errMsg:{}", errMsg)
                    } else {
                        // console.log("pagination:",pagination);

                        this.total = pagination.total;
                        this.pageSize = pagination.pagerSize;
                        this.currentPage = pagination.page;
                        this.bills = list;
                        this.bills.forEach(item => {
                            item.consumeCreate = this.timestampToTime(item.consumeCreate);
                            item.consumeUpdate = this.timestampToTime(item.consumeUpdate);
                        })
					}
                    this.listLoading = false;
				});
			},
			//删除
			handleDel: function (index, row) {
			    console.log("scope index:",index," row :",row);
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let param = { id: row.id };
                    removeBill(param).then((result) => {
						this.listLoading = false;
                        let { errCode, errMsg, data } = result;
                        if(errCode != 0){
                            console.log("http request err. errMsg:{}", errMsg)
                        } else {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.currentPage = 1;
                            this.getBillList(this.currentPage);
						}
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
                console.log("edit is:", row);
				this.editFormVisible = true;
				this.editForm.name = row.consumeInfo;
				this.editForm.money = row.money;
				this.editForm.type = row.consumeType;
				this.editForm.id = row.id;
                this.editForm.date = new Date(row.consumeCreate);

			},
			//显示新增界面
			handleAdd: function () {
			    console.log("begin handle add")
				this.addFormVisible = true;
				this.addForm = {
                    name:'',
                    money: '0.0',
                    type: '饮食',
                    date: new Date(),
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let param = Object.assign({}, this.editForm);
							console.log("editSubmit request param. param:",param);
                            updateConsumeBill(param).then((result) => {
								this.editLoading = false;
                                let { errCode, errMsg, data } = result;
                                if(errCode != 0){
                                    console.log("http request err. errMsg:{}", errMsg)
                                } else {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['editForm'].resetFields();
								}
							});
                            this.editFormVisible = false;
                            this.currentPage = 1
                            this.getBillList(this.currentPage);
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let params = { type: this.addForm.type, date: this.addForm.date, description:this.addForm.name, money:this.addForm.money};
							createConsumeBill((params)).then(result =>{
								let { errCode, errMsg, data } = result;
								if(errCode != 0){
									console.log("http request err. errMsg:{}", errMsg)
								} else {
									console.log("http request success. result:{}", data);
                                    this.addLoading = false;
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.currentPage = 1
                                    this.getBillList(this.currentPage);
								}
							})
						});
					}
				});
			},
            selectsChange: function (selects) {
				this.selects = selects;
			},
			//批量删除
			batchRemove: function () {
				let ids = this.selects.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let param = { ids: ids };
					console.log("ids:", ids)
                    batchRemoveBill(param).then((result) => {
                        let { errCode, errMsg, data } = result;
                        if(errCode != 0){
                            console.log("http request err. errMsg:{}", errMsg)
                        } else {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
						}
					});
                    this.listLoading = false;
                    this.currentPage = 1;
                    this.getBillList(this.currentPage);
				}).catch(() => {

				});
			},
			getYears(){
			    let date = new Date();
			    let begin = 2018;
			    let end = date.getFullYear();
			    console.log("month:{}",date.getMonth());
			    for(let i=end; i>= begin; i--){
                    this.years.push(i);
				}
                this.edit_bill_form.year = end;
			    this.edit_bill_form.month = date.getMonth() + 1;
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
                    }
                })

            },
            timestampToTime(timestamp) {
                let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-'
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
                let D = (date.getDate() < 10 ? ('0'+ date.getDate()):(date.getDate())) + ' '
                let h = (date.getHours() < 10 ? ('0'+ date.getHours()):(date.getHours())) + ':'
                let m = (date.getMinutes() < 10 ? ('0'+ date.getMinutes()):(date.getMinutes())) + ':'
                let s = date.getSeconds() < 10 ? ('0'+ date.getSeconds()):(date.getSeconds())
                return Y+M+D+h+m+s
            }
		},
		mounted() {
			this.getBills();
		},
		created() {
            this.getTypes();
            this.getYears();
		}
	}

</script>

<style scoped>

</style>