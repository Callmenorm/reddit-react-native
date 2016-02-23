import React, {
    PropTypes,
    View,
    Text
} from 'react-native';

const DumbToc = React.createClass({
    displayName: 'DumbToc',
    propTypes: {
        subscribed: PropTypes.array.isRequired
    },
    renderEmpty() {
        return (
            <Text>
                Not Subscribed to Any Subreddits
            </Text>
        );
    },
    renderNonEmpty(subscriptions) {
        return (
            <View>
                {
                    subscriptions.map((subscription, idx) => {
                        return (
                            <Text key={idx}>
                                {subscription.title}
                            </Text>
                        );
                    })
                }
            </View>
        );
    },
    render() {
        var mySubReddits = this.props.subscribed;
        return mySubReddits.length === 0 ? this.renderEmpty() : this.renderNonEmpty(mySubReddits);
    }
});

export default DumbToc;