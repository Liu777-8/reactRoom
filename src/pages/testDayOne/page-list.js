import React, { createContext } from 'react';
import { observable, action } from 'mobx';
import { getTestData } from '@/apis/ceshi';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
class TestDayOneStore {
  @observable page = 996;
  @observable pageParam = {
    pageNo: 1,
    pageSize: 10,
  };
  @observable searchParams = {
    title: '',
  };
  @observable columns = [
    {
      title: '序号',
      dataIndex: 'key',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '来文文号',
      dataIndex: 'docCode',
    },
    {
      title: '来文单位',
      dataIndex: 'publishInstitution',
    },
    {
      title: '审批完成日期',
      dataIndex: 'receiveDate',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record, index) => {
        return (
          <Link to={`/details`}>
            <Button type="link">查看</Button>
          </Link>
        );
      },
    },
  ];
  @observable loading = false;
  @observable tableData = [];
  @observable pagination = {
    size: 'small',
    pageSize: 10,
    currentPage: 1,
    total: 0,
    showSizeChanger: true,
    onChange: (currentP, size) => {
      this.pageParam.pageNo = currentP;
      this.pageParam.pageSize = size;
      this.getList();
    },
    onShowSizeChange: (currentP, size) => {
      this.pageParam.pageNo = currentP;
      this.pageParam.pageSize = size;
      this.getList();
    },
    showTotal: (totalP) => `共 ${totalP} 条记录`,
  };
  @action.bound
  async getList() {
    this.loading = true;
    let params = {
      pageParam: { ...this.pageParam },
      queryParam: { ...this.searchParams },
    };
    const res = await getTestData(params);
    if (res.data) {
      this.tableData = res.data.records || [];
      this.pagination.total = res.data.total || 0;
      this.pagination.currentPage = this.pageParam.pageNo;
      this.pagination.pageSize = this.pageParam.pageSize;
    } else {
      this.tableData = [
        {
          key: 1,
          title: '测试数据',
          docCode: '测试数据',
          publishInstitution: '测试数据',
          receiveDate: '测试数据',
        },
      ];
    }
    this.loading = false;
  }
  @action.bound
  resetFields() {
    this.searchParams = {
      title: '',
    };
    this.pageParam = {
      pageNo: 1,
      pageSize: 10,
    };
    this.getList();
  }
}

export default createContext(new TestDayOneStore());
