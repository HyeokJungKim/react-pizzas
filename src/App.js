import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzas: [],
      pizza: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  handleEdit = (pizza) => {
    this.setState({pizza: pizza})
  }

  onType = (event) => {
    // console.log(event.target.value);
    const pizzaTopping = event.target.value
    this.setState((prevState)=> {
      return {pizza: {...prevState.pizza, topping: pizzaTopping}}
    })
  }

  onDropdown = (event) => {
    const pizzaSize = event.target.value
    this.setState((prevState)=> {
      return {pizza: {...prevState.pizza, size: pizzaSize}}
    })
  }

  onRadioButton = (event) => {
    const isVeg = event.target.value === "Vegetarian"
    this.setState((prevState)=> {
      return {pizza: {...prevState.pizza, vegetarian: isVeg}}
    })
  }

  submitForm = () => {
    if(this.state.pizza.id){
      const pizzaId = this.state.pizza.id
      fetch(`http://localhost:3000/pizzas/${pizzaId}`,{
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(this.state.pizza)
      })
      .then(res => res.json())
      .then(pizzaObj => {
        const newPizzaArray = this.state.pizzas.map(pizza => {
          if(pizza.id === pizzaId){
            return pizzaObj
          } else{
            return pizza
          }
        })
        this.setState({pizzas: newPizzaArray})

      })
    }
  }

  render() {
    console.log(this.state.pizza);
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          pizza={this.state.pizza}
          onType={this.onType}
          onDropdown={this.onDropdown}
          onRadioButton={this.onRadioButton}
          submitForm={this.submitForm}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          handleEdit={this.handleEdit}
        />
      </Fragment>
    );
  }
}

export default App;
