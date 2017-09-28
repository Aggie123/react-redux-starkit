function getPieOptions(option){

	let { title, series } = option, { text, subtext } = title, { name, data }=series;

	let legendData=[];
	if(data&&data.length>0){
		data.forEach(item=>{
			legendData.push(item.name);
		})
	}

	const PieOption= {
	    title : {
	        text: text,
	        subtext: subtext,
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: legendData
	    },
	    series : [
	        {
	            name: name,
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:data,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	return PieOption;
}

export { getPieOptions };