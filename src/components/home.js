import React, { Component } from 'react';
// import { Link } from 'react-router-dom';


import { connect } from 'react-redux';
import {  GetServerData } from '../store/action/action';
import { Route, Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment';
import Navbar from '../components/navbar';

import RaisedButton from 'material-ui/RaisedButton';
import Request from 'react-http-request';

const style = {
    height: 300,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const styleq = {
    margin: 12,
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

            controlledDate1: null,
            controlledDate2: null,
            disable: false,
            controlledDate1Str: '',
            controlledDate2Str: '',
            picture: []



        }


    }



    handleChange = (event, date) => {

        this.setState({

            controlledDate1Str: moment(date).format('YYYY-MM-DD 00:00:00'),
            controlledDate1: date
        });

    }


    handleChange2 = (event, date) => {

        this.setState({

            controlledDate2Str: moment(date).format('YYYY-MM-DD 00:00:00'),
            controlledDate2: date

        });

    }

    dataPicker(date) {
     
    
            
            this.setState({
                disable: false,
                controlledDate1Str:date
            })

        
    }


    dataPicker1(date) {
   
         this.setState({
                disable: false,
                controlledDate1Str:date
            })
    }

    DatePick(date_1, date_2) {

        console.log('DATA PICKER]]', date_1, date_2)

        if (date_1 === '' && date_2 === '') {
            alert("Pick date please ")

        }
        else if (date_2 === '') {
            alert('pick the end release date')

        }
        else if (this.state.controlledDate1 > this.state.controlledDate2) {
            alert("you need to start date minmum to end date ")
            this.setState({
                disable: true
            })

        }
        else {


            this.props.GetServerData();
            console.log("hit the API")


        }


    }

    // ComponentDidMount(){
    //      fetch('https://www.giantbomb.com/api/games/?api_key=875adc8d6de97c6ce8c25c7d525593f449efa46f&format=json&filter=original_release_date:2017-02-17|2018-02-17&field_list=name,image,original_release_date,https://www.giantbomb.com/api/games/?api_key=875adc8d6de97c6ce8c25c7d525593f449efa46f&format=json&filter=original_release_date:2017-02-17|2018-02-17&field_list=name,image,original_release_date,site_detail_url')
    //     .then(results=>{
    //         return results.json();
    //     }).then(data => {
    //         let picture =data.results.map((pic)=>{
    //             return (
    //                 <div key={pic.results}>
    //                     <img src={pic.picture.site_detail_url} alt=""/>
    //                 </div>

    //             )
    //         })
    //         this.setState({picture:picture});
    //         console.log("state",this.state.picture)
    //     })
    // }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <b />
                    <center>
                        <h1>React Game Explorer ...</h1>
                        <br /><br />
                        <h2>Release Year (Start Value)</h2>
                        <DatePicker
                            hintText="Release year (Start Value)"

                            value={this.state.controlledDate1}
                            onChange={this.handleChange}

                            onClick={this.dataPicker.bind(this,this.state.controlledDate1Str)}
                        />

                        <br />
                        <br />
                        <h2>Release Year (End Value)</h2>
                        <DatePicker
                            hintText="Release year (End Value)"

                            onChange={this.handleChange2}
                            value={this.state.controlledDate2}

                            onClick={this.dataPicker1.bind(this,this.controlledDate2Str)}
                        />
                        <br />
                        {/* <FloatingActionButton disabled={false} onClick={this.DatePick.bind(this, this.state.controlledDate1Str, this.state.controlledDate2Str)} >

                             <ContentAdd /> 

                        </FloatingActionButton> */}
                        <RaisedButton label="Search" disabled={this.state.disable} style={styleq} value={this.state.disable}
                            onClick={this.DatePick.bind(this, this.state.controlledDate1Str, this.state.controlledDate2Str)} />
                        <br />
                        <br />
                        <br />



                        <br />
                        <br />


                                <div>
                        {
                            this.props.Data.map((msg, ind) => {
                                return (


                                    ((this.state.controlledDate1Str === msg.original_release_date)
                                        || (this.state.controlledDate2Str === msg.original_release_date)) ?
                                        <span key={ind}>
                                            <div >
                                                {/* <CircularProgress size={60} thickness={7} /> */}

                                                <Paper style={style} zDepth={5} >
                                                    <br />
                                                    <img src={msg.image.icon_url} alt="game images" /><br /><br />
                                                    {msg.name}<br /><br />
                                                    {msg.original_release_date}<br /><br />
                                                    <a href={msg.site_detail_url} >Detail_url</a>
                                                </Paper>
                                            </div>
                                            <br />
                                            <br />


                                        </span>
                                        : null
                                );
                            })
                        }
                        </div>
                    </center>
                </MuiThemeProvider>

            </div>
        )
    }
}

function mapStateToProp(state) {
    console.log("CurrentUserArray", state.root.Data)
    return ({
        userName: state.root.userName,
        Data: state.root.Data,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: () => { dispatch(changeUserName()) },
        GetServerData: () => { dispatch(GetServerData()) },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);

