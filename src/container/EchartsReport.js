import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

import { getFunnelOption } from '../component/options/funnel';
import { getLineOption } from '../component/options/line';
import { getPieOptions } from '../component/options/pie';

import '../css/chart.scss'

export default class EchartsReport extends Component{
    render(){
        const dataFunnel=
            [
                {value: 60, name: '访问'},
                {value: 40, name: '购物车'},
                {value: 20, name: '支付'},
                {value: 80, name: '点击'},
                {value: 100, name: '曝光'}
            ];
        const dataLine=[
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
                            }
        ];
        const pieData={
            title:{
                text:'Mijia用户渠道',
                subtext:'mijia test'
            },
            series:{
                name:'渠道',
                data:[
                    {value:335, name:'电视'},
                    {value:310, name:'路由器'},
                    {value:234, name:'网'},
                    {value:785, name:'家'},
                    {value:1548, name:'有品'},
                    {value:50, name:'投屏神器'},
                    {value:100, name:'直播'}
                ]
            }

        };
        return (
            <div style={{backgroundColor:'#eee'}}>
                <div className='container-inline'>
                    <ReactEcharts
                        option={getPieOptions(pieData)}
                        style={{height: '350px', width: '500px',display:'inline-block',marginLeft:'50px'}}
                        className='react_for_echarts' />

                    <ReactEcharts
                        option={getFunnelOption(dataFunnel)}
                        style={{height: '350px', width: '500px',display:'inline-block'}}
                        className='react_for_echarts' />
                    
                </div>
                <div className='container'>
                    <ReactEcharts
                        option={getLineOption(dataLine)}
                        style={{height: '350px', width: '100%'}}
                        className='react_for_echarts' />
                </div>
                
            </div>
        );

            
    }
}