import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`http://127.0.0.1:8081/login`, params, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => res.data); };

export const getConsumeTypes = params => { return axios.get(`http://127.0.0.1:8081/bill/bill_type`,{ params: params }).then(res => res.data); };

export const createConsumeBill = params => { return axios.post(`http://127.0.0.1:8081/bill/create_bill`,params,{headers: { 'Content-Type': 'application/json'}}).then(res => res.data); };

export const getConsumeBillListPage = params => { return axios.get(`http://127.0.0.1:8081/bill/list_bill`,{params:params}).then(res => res.data); };

export const removeBill = params => { return axios.get(`http://127.0.0.1:8081/bill/remove_bill`, { params: params }).then(res => res.data); };

export const batchRemoveBill = params => { return axios.get(`http://127.0.0.1:8081/bill/batch_remove_bill`, { params: params }).then(res => res.data); };

export const updateConsumeBill = params => { return axios.post(`http://127.0.0.1:8081/bill/update_bill`,params,{headers: { 'Content-Type': 'application/json'}}).then(res => res.data); };

export const chartsBillYearMonth = params => { return axios.get(`http://127.0.0.1:8081/bill/charts_bill/year_month`, { params: params }).then(res => res.data); };

export const chartsBillYear= params => { return axios.get(`http://127.0.0.1:8081/bill/charts_bill/year`, { params: params }).then(res => res.data); };





export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };