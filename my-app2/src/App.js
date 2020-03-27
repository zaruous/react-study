import React from 'react';
import './App.css';
/* ag-grid*/
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

/* material-ui*/
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'



function App() {
  return (
    <div className="App" style={{height:'100%'}} >
      <Counter >Button1</Counter >
	  <div className='grid-wrapper'>
		<AgGridComponent />
	  </div>
	  <OrderBomWebservice/>
	  <StatusBar ></StatusBar>
    </div>
  );
}

class StatusBar extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			statusMessage : 'status ready'
		};
	}

	showStatusMessage = (message) =>{
		this.setState({statusMessage : message});
	}

	render(){
		return <div className='status-bar'><p>{this.state.statusMessage}</p></div>
	}
}

class Counter extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			count : 0 ,
			content: 'constructor.',
			status : 'PASS',
		};
		this.countPlus = this.countPlus.bind( this );
		console.log('constructor call.');
	}
	

	
	
	countPlus() {
		let h = new Headers();
		/*
		POST 방식일 경우 Content-type이 아래 셋 중의 하나여야 한다.
		application/x-www-form-urlencoded
		multipart/form-data
		text/plain
		*/
		// Content-Type,  Access-Control-Allow-Headers
		
		h.append('access-control-allow-headers'  , '*');
		h.append('access-control-allow-origin'   , '*');
		h.append('content-type'                  , 'application/json,charset=utf-8');
		h.append('access-control-allow-methods'  , 'GET,POST,PUT,OPTIONS');
		h.append('access-control-max-age'        , '120');
		
		
	
		
		let url = "http://localhost:8080/restapi/GridData";
		fetch(url, {
			method: 'GET',
			headers : h,
			mode: 'cors',
		  })
		// .then(contents => { console.log(contents); return content;} )
		//.then( (response) => { return ResponseConverter(response) ; } )
		.then( resp => resp.json() )
		.then( (response) => {
			console.log(response);
			//const {count} = this.state;
			
			this.setState({ 
							count: this.state.count + 1 , 
							content :  response.status,
							status : 'PASS' });
			
			

		}, (err) =>{
			console.log("############# Error 발생 ");
			console.log(err);
			this.setState({ status : 'server has a problem.'} );
		});
		
		/* body: 'title=hello&message=world', */
		//.catch(( err ) => { console.log("Can’t access " + url + " response. Blocked by browser?"); console.log(err); });
		
	}
	/* 
		콤포넌트가 화면에 나타나게 됐을때 호출.
		데이터 요청을 위해 axios,fetch등을 통하여 ajax 요청을 하거나 DOM의 속성을 읽거나
		직접 변경하는 작업 진행.
	*/
	componentDidMount(){
		this.setState({content : 'componentDidMount'});
		console.log('componentDidMount call.');
	}
	
	

	shouldComponentUpdate(nextProps, nextState) {
		// return false 하면 업데이트를 안함
		// return this.props.checked !== nextProps.checked
		return true;
	}

	render(){

		if('PASS' !== this.state.status )
		{
			return <div><p>{this.state.count}</p><button onClick={this.countPlus}>Button</button><p>{this.state.status}</p></div>
		}
		return <div><p>{this.state.count}</p><button onClick={this.countPlus}>Button</button><p>{this.state.content}</p></div>
	}
	
}


class AgGridComponent extends React.Component{
		constructor(props)
		{
			super(props);
			this.state = 
			{
			  columnDefs: [{
				headerName: "Make", field: "make", sortable: true, filter: true
			  }, {
				headerName: "Model", field: "model"
			  }, {
				headerName: "Price", field: "price"
			  }, {
				headerName: "Xml", field: "xml"
			  }],
			};
			
			/* this.state.rowData.push( {make:"KYJ", model:"KOREA" , price : 2222 } ); */
			this.reqAppendData = this.reqAppendData.bind( this );
		}

		componentDidMount(){
			this.setState({
				rowData: [{
					make: "Toyota", model: "Celica", price: 35000
				  }, {
					make: "Ford", model: "Mondeo", price: 32000
				  }, {
					make: "Porsche", model: "Boxter", price: 72000
				  }],
			});
		}

		reqAppendData() {
			console.log("call reqAppendData")
			let h = new Headers();
			/*
			POST 방식일 경우 Content-type이 아래 셋 중의 하나여야 한다.
			application/x-www-form-urlencoded
			multipart/form-data
			text/plain
			*/
			// Content-Type,  Access-Control-Allow-Headers
			
			h.append('access-control-allow-headers'  , '*');
			h.append('access-control-allow-origin'   , '*');
			h.append('content-type'                  , 'application/json,charset=utf-8');
			h.append('access-control-allow-methods'  , 'GET,POST,PUT,OPTIONS');
			h.append('access-control-max-age'        , '120');
			//h.append('resultDataType' , 'list');
			
		
			
			let url = "http://localhost:8080/restapi/GridData";
			fetch(url, {
				method: 'GET',
				headers : h,
				mode: 'cors',
			  })
			.then( resp => resp.json() )
			.then( (resp) => {
			  let oldData = this.state.rowData;

				let newdata = [];
				oldData.forEach( item =>{
					newdata.push(item);
				})
				this.setState( {rowData: newdata  });
	
			}, (err) =>{
				console.log("############# Error 발생 ");
				console.log(err);
				this.setState({ status : 'server222 has a problem.'} );
			});
			
			/* body: 'title=hello&message=world', */
			//.catch(( err ) => { console.log("Can’t access " + url + " response. Blocked by browser?"); console.log(err); });
			
		}
		
		render(){
			console.log("render");
			console.log(this.state.rowData);
			return (
				  <div
					className="ag-theme-balham"
					style={{
					height: '500px',
					width: '100%' }}
				  >
					<button onClick={this.reqAppendData}>데이터 추가</button>
					<AgGridReact
					  columnDefs={this.state.columnDefs}
					  rowData={this.state.rowData}>
					</AgGridReact>
				  </div>
				);
		}
}




class OrderBomWebservice extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			message : '',
			batchNumber:'3118099',
			productCode:'C2AM04',
		};
		//this.createHeader = this.createHeader.bind(this);
		//this.btnRequestOnClick = this.btnRequestOnClick.bind(this);
		
	}

	createHeader = () => {
		let h= new Headers();
		/*
		h.append('access-control-allow-headers'  , '*');
		h.append('access-control-allow-origin'   , '*');
		h.append('content-type'                  , 'application/json,charset=utf-8');
		h.append('access-control-allow-methods'  , 'GET,POST,PUT,OPTIONS');
		h.append('access-control-max-age'        , '120');
		*/
		return h;
	};


	componentDidMount(){
		let h= this.createHeader(); //new Headers();
		let url = "http://localhost:8080/restapi/EMRSerivceProxy";
		/*
		h.append('access-control-allow-headers'  , '*');
		h.append('access-control-allow-origin'   , '*');
		h.append('content-type'                  , 'application/json,charset=utf-8');
		h.append('access-control-allow-methods'  , 'GET,POST,PUT,OPTIONS');
		h.append('access-control-max-age'        , '120');
		*/
		fetch( url,{
			method : "GET",
			header : h,
			mode: 'cors',
		} ).then(res => res.text()).then( res => {
			console.log("## Print ###");
			console.log(res);
		});
		
		this.setState({
			message : 'ready',
		});
	}

	

	btnRequestOnClick = () => {
		let h= this.createHeader(); //new Headers();
		let url = "http://localhost:8080/restapi/EMRSerivceProxy";
		
		let data = {
				batchNumber : this.state.batchNumber, 
				productCode : this.state.productCode,
			};
		console.log(data);	
		fetch( url, {
			method : "PUT",
			header : h,
			mode: 'cors',
			body : JSON.stringify(data),
		} ).then(res => res.text()).then( res => {
			console.log("## Print ###");
			console.log(res);
			this.setState({
				message : res,
			});	
		});
		
		
	}

	render(){
		return (<div>
					<div>
						<p id='txt-order-create'>Order Craete Service</p>
					</div>
					<label>BatchNumber </label>
					<TextField  id='txtBatchNumber' autoComplete='true' defaultValue={this.state.batchNumber}/>
					<label>ProductCode </label>
					<TextField  id='txtProductNo' defaultValue={this.state.productCode}/>
					<Button variant="outlined" color='secondary' onClick={this.btnRequestOnClick}>Request</Button>
					<p>{this.state.message}</p></div>);
	}
}
export default App;
