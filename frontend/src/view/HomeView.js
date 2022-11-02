import React from 'react';
import {Layout,Carousel} from 'antd'
import HeaderInfo from "../components/HeaderInfo";
import SideBars from "../components/SideBars"
import '../css/home.css'
//import {withCarousel} from "../components/BookCarousel";
import BookList from "../components/BookList";
const { Header,Content,Footer } = Layout;

class HomeView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.showData,
            pageType: this.props.pageType,
            user: ""
        };
    }

    componentDidMount() {
        let user = localStorage.getItem("username");
        this.setState({user:user});
    }

    render() {
        return (
            <Layout className="Layout">
                <header>
                    <HeaderInfo pageName={this.state.pageType} />
                </header>
                <div>
                    <SideBars />
                    <Content className="content" style={{ padding: '0 50px'}}>
                        <div className="home-content">
                            <BookList initialData={this.state.data}/>
                            <div className="foot-wrapper"></div>
                        </div>
                    </Content>
                </div>
            </Layout>
        );
    }
}

export default HomeView;