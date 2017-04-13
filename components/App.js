var React = require('react');
// var GMaps = require('gmaps');

var Search = require('./Search'),
    Map = require('./Map'),
    CurrentLocation = require('./CurrentLocation'),
    LocationList = require('./LocationList');

var App = React.createClass({
    getInitialState() {
        // Extract the favourite locations from local storage

        var favourites = [];

        if (localStorage.favourites) {
            favourites = JSON.parse(localStorage.favourites);
        }

        return {
            favourites: favourites,
            currentAddress: 'Paris, France',
            mapCoordinates: {
                lat: 48.856614,
                lng: 2.3522219
            }
        };
    },

    toggleFavourite(address) {
        if (this.isAddressInFavourites(address)) {
            this.removeFromFavourites(address);
        } else {
            this.addToFavourites(address);
        }
    },

    addToFavourites(address) {
        var favourites = this.state.favourites;

        favourites.push({
            address: address,
            timestamp: Date.now()
        });

        this.setState({favourites:favourites});

        localStorage.favourites = JSON.stringify(favourites);
    },

    removeFromFavourites(address) {
        var favourites = this.state.favourites;
        var index = -1;

        for (var i = 0; i < favourites.length; i++) {
            if (favourites[i].address == address) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            favourites.splice(index, 1);

            this.setState({favourites:favourites});

            localStorage.favourites = JSON.stringify(favourites);
        }
    },

    isAddressInFavourites(address) {
        var favourites = this.state.favourites;

        for(var i =0; i < favourites.length; i++) {
            if (favourites[i].address == address) {
                return true;
            }
        }

        return false;
    },

    searchForAddress(address) {
        var self = this;

        GMaps.geocode({
            address: address,
            callback: function(results, status) {
                if (status != 'OK') return
                var latlng = results[0].geometry.location;
                self.setState({
                    currentAddress: results[0].formatted_address,
                    mapCoordinates: {
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    }
                });
            }
        });
    },

    render() {
        return (
            <div>
                <h1>Your Google Maps Locations</h1>

                <Search onSearch={this.searchForAddress} />

                <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />

                <CurrentLocation address={this.state.currentAddress} 
                                    favourite={this.isAddressInFavourites(this.state.currentAddress)} 
                                    onFavouriteToggle={this.toggleFavourite} />

                <LocationList locations={this.state.favourites}
                                activeLocationAddress={this.state.currentAddress}
                                onClick={this.searchForAddress} />
            </div>
        );
    }
});

module.exports = App;