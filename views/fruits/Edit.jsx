const React = require('react')
const DefaultLayout = require('../layouts/Default')

class Edit extends React.Component {
    render() {
        return(
            <DefaultLayout title='Edit Page'>
                <form action={`/fruits/${this.props.fruit._id}?_method=PUT`} method="POST">
                    {/* We have a default value as fruit.name in since we want to know what fruit we're editing*/}
                    Name: <input type = 'text' name = 'name' defaultValue={this.props.fruit.name}/>
                    <br/>
                    Color: <input type = 'text' name = 'color' defaultValue= {this.props.fruit.color} />
                    <br />
                    Is Ready to Eat: {this.props.fruit.readyToEat ? <input type = 'checkbox' name = 'readyToEat' defaultChecked /> : <input type = 'checkbox' name = 'readyToEat'/>}
                    <br /> 
                    url: <input type = 'text' name= 'img' defaultValue = {this.props.fruit.img} />
                    <input type = 'submit' value ='Submit Changes'></input>
                    
                </form>
            </DefaultLayout>
        )
    }
}

module.exports = Edit