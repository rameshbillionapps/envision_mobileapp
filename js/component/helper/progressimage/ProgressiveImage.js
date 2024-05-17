import React from 'react';
import { View, StyleSheet, Animated ,Text , Dimensions } from 'react-native';

const styles = StyleSheet.create({
  imageOverlay: {

  },
  container: {
    backgroundColor: 'transparent',
  },
  overlay: {
      position: 'absolute',
      top: 15,
      right: 0,
      bottom: 10,
      left: 0,
      backgroundColor: '#444444',
      opacity: 0.3,
      width: Dimensions.get('window').width/3,height:80, justifyContent: 'center',
      alignItems: 'center',
  },
  activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
      height:  Dimensions.get('window').height,
  }

});

class ProgressiveImage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      loaded:this.props.loader
    }
  }
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    this.setState({
      loaded:false
    })
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start();
  }

  onImageLoad = () => {
    this.setState({
      loaded:false
    })
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
  }

  render() {
    const {
      source,
      style,
      ...props
    } = this.props;

    return (
      <View style={styles.container}>
      {this.state.loaded && <View style={[styles.overlay,{height:this.props.data.height,width:this.props.data.width}]}>
       <Text style={{fontFamily: 'Lato-Regular',color:"#fff",fontSize: 14, textAlign:'center'}} > Image Loading ... </Text>
      </View>}
      <Animated.Image
        {...props}
        source={source}
        style={[style, { opacity: this.thumbnailAnimated }]}
        onLoad={this.handleThumbnailLoad}
      />
      </View>
    );
  }
}

export default ProgressiveImage;
