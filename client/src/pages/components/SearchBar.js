import React from 'react'
import SearchBar from "material-ui-search-bar";

class SearchBarWrapper extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            searchTerm: ''
        }
    }

    //handlers that update the input in state once input is added
    handleChange = (newValue) => {
        this.setState({
            searchTerm: newValue
        })
    }

    handleSubmit = () => {
        const {searchTerm} = this.state
        const {onFormSubmit} = this.props

        onFormSubmit (searchTerm)
    }

    render () {
        return (
            <SearchBar
                value={this.state.searchTerm}
                onChange={this.handleChange}
                onRequestSearch={this.handleSubmit}
                onCancelSearch={()=>{
                    this.setState({
                        searchTerm: ''
                    })
                }}
            />
            
        )
    }
}

export default SearchBarWrapper
