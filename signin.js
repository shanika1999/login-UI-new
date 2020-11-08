import React from "react";
//import com.facebook.FacebookSdk;
import { LoginButton,AccessToken,LoginManager  } from 'react-native-fbsdk';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
// var jwtDecode = require("jwt-decode");
export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    //import HomeScreen from './screens/HomeScreen';
  }
  // componentDidMount() {
  //   this._loadInitialState().done();
  // }
  // _loadInitialState = async () => {
  //   var value = await AsyncStorage.getItem("ProfileScreen");
  //   if (value !== null) {
  //     this.props.navigation.navigate("HomeScreen");
  //   }
  // };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}> Sign In</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            underlineColorAndriod="transparent"
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            underlineColorAndriod="transparent"
          />
          <TouchableOpacity style={styles.btn} onPress={this.login}>
            <Text style={styles.bt}>Login</Text>
          </TouchableOpacity>

          

          
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
           <Text>

           </Text> 
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center',}}>
           <View style={{flex: 1, height:2, backgroundColor: 'black'}} />
          <View>
          <Text style={styles.continue}>continue with your social account</Text>
         </View>
         <View style={{flex: 1, height: 2, backgroundColor: 'black'}} />
         </View>




         <View style={{flexDirection: 'row', alignItems: 'center',}}>
           <Text>

           </Text> 
          </View>


         <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: "center"
          }}>
       <View style={{width: 60, height: 60, backgroundColor: 'white',justifyContent: "center",
          alignItems: "center"}}>
        <TouchableHighlight 
  onPress={() => Linking.openURL('https://facebook.com')}>
  <Image 
    source={{uri:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSgsGBoxGxUVLTIhMSkrLi8uFx84QDM4QygtLisBCgoKDg0NFw8PFSslFR03MS03LSs3LzctMCs3LS0uLS03Mi0tKy0rNysrKysrLSsrKy0rNystKysrLS0rKy0tN//AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQcCBggFBAP/xABKEAEAAgEBAggJBwkECwAAAAAAAQIDBBGxBQYHMTJxcnQSEyE0QVFUs9IWIjVTgZGTJEJhhJKytMLDQ6HB8BQVFzNSYmNkc5Si/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQECBv/EACoRAQABAwMCBgICAwAAAAAAAAABAgMxBBEyE1ESFCEzUrEigWGhQWJx/9oADAMBAAIRAxEAPwDYuUDjtmrmyaLRZJxVxTNM+ek7Mlsnpx0n82I9M8+31bPLo6bTRt464V7t2d9oV3ly3vM2ve17Tz2vabWn7ZXoiIwrsHQAAAAAAAAAAAAAAAAAAAAAABlS01mJrM1mOaYmYmPtBunEzjzqNNlpg1mW2bS3tFPGZbTbJp5nmt4U+Wa+uJ5o5ubZNS/paao3pj8k1u7MTtOFwMpac2Zsk3ve9p22va17T67WnbM/fLfiNo2Z7B0AAAAAAAAAAAAAAAAAAAAAAAAAJgHtfKjW/W2++UPQo7PfUl4qZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASCASCAASAACASCAAAfXwZwZqdZk8VpcN81/JtikeSseibWnyVj9MzDxXXTRG9U7OxTM4bxwXyW5rRFtXqaYvXjwV8ZbZ252RE/ZKpXrojjCaLE/5lsOm5NeC6RsvGozT68maa/uRVBOsuTjaEkWaX0/7PeB/ZLf8Atar43nzd3v8A1B0aOyJ5POB/Zrx1anUf43PN3e/9QdGjs/G/JvwVPNTPXs57Tv2u+cu9zo0te438QtHodDn1eHLqZvi8VspkvjtjnwstaTzUiea0+lPY1VddcUzEI67UU07wrpfQAAAAAAAAJBAJBAAJBAAAAAANp4lcT8nCV/G5Jti0dLbL5I8l8to56U2/329G6tqNRFuNo5JLdvxf8XHwdwfg0mKuHT4q4sdeatY559cz6Z/TPlZVVdVU71T6rcRERtD6nl0AAABrHKT9D6z9X/iMaxpfep/f0ju8JUg2FMAAAAAAABIAIABIIAAAAAB6fFrga/CGrxaWkzWLTNst4/s8Nelbr5oj9Mwju3It0TVL1RT4p2X5o9LjwYseHDSKYsdYpSkc0Vj/ADzsSqqap3nK7EbRtD93HQAAAAGscpP0PrP1f+IxrGl96n9/SO7wlSDYUwAAAAAAEggEgAgAEggAEggAFr8kXBcU0ubWWj5+oyTjpP8A0cfknZ138L9mGZra96op7LNin03b+pJwAAAAAGs8pP0PrP1f+IxrGl96n9/SO7wlR7YUwAAAAAAAAAEggEggAAAACQX/AMUtL4jg3RY9myY02K1o/wCe1fCt/fMsS9V4rlUr1EbUw9dE9AAPj4X4Tw6LBk1Oe3g48cbZ2RttaZ8kVrHpmZe6KJrq8MZcqqiI3lVfCvKXr8tpjTVx6XH+b82M2bZ65m3k+zZ9rRo0dEcvWVab1U4eTPHbhf27J+Hgj+RL5a18ft46lfdHy14X9uyfh4fhPLWvj9nUr7vn1/GjhHU4r4M+qvlxX8Hw6TTFETstFo8sVj0xD1TYt0zvTT6uTXVMbTLyEryAAAAAAAAkEAAkEAkEAAAAxvzT1SQS6T01fBx46x+bSsfdEMCctCH6uAACs+WPWW/ItNE/Nnxue8eu0bK0n7pv97Q0NPKpXvziFatBXAAAAAAAAAAAASCASCAAAAAAAY5OjbqncRkl0ri6NezG5gS0GbgAAqjlh870ndrfvy0tDxlWv5hoC8gAAAAAAAAAAAAAAAAAAAAAAY5OjbqkjJLpXF0a9mNzAloM3AABU/LD53pO7W95LS0PGVa/mGgryAAAAAAAAAAABIIAAAAAAA2gbYA2gwyT823VLsZcl0ti6NezG58/LRZuAACp+WGfyvSd2t7yWnoeEq1/MNA2rqA2gbQTtAAAAAAAAABIAIAAAABcXJN9GT3rNuqytZ7q3Z4t0VEoAACASAAAAACuuWTUbMOiw/8AHly5f2KRX+ov6GPWqUF+fSIVc0VYAAAAAAAAAAAAAABcXJN9GT3rNuqytZ7q3Z4t0VEoAAAAAAAAACpuWDPt1mlxfV6acn7eSY/ptPQx+EyrX59YhoS6gAAAAAAAAAAAAAAAXFyTfRk96zbqsrWe6t2eLdFRKAAAAAAAAAApPlN1Hh8LZ6/VY8GL/wCIv/O19JG1qP5U70/m1VZRgAAAAAAAAAAAAAALi5Jvoye9Zt1WVrPdW7PFuiolAAAAAAAAAAUBxu1HjeE9ff8A7rLT7KT4EfutuxG1umP4Ua53ql5CV5AAAAAAAAAAAAAAAerwZxl1+jx+J02pthx+FN/AimK0eFPPO21Z9UIq7NFc71R6vUV1R6RL7Plvwv7df8LT/A8+WtfH7d6tfc+W/C/t1/wtP8B5a18fs6tfdjfjxwxsn8uvzT/Zaf4HY01r4/Z1a+69cc7a1n1xG5iyusgAAV3ymcYNdotTp6aXUWw0vgta0RTHbbbw9m351ZXtJaorpmaoQXa5pmNpad8t+F/br/haf4Fvy1r4/aHq19z5b8L+3X/C0/wHlrXx+zq19z5b8L+3X/C0/wAB5a18fs6tfd4OXJa9rXtPhXva17Wnnm0ztmfvlNEbRtDwwdAAAAAAAAAAAAAAAAAAGOTo26p3Oxkl0ri6NezG58/LQZuAACqOWHzvSd2t7yWnoeMq1/MNAXUAAAAAAACQQAAAAAAAAAAAAADHJ0bdU7nYyS6VxdGvZjc+floM3AABVHLD53pO7W95LS0PGVa/mGgLyAAABIIAABIIAAAAAAAAAAAAABjk6NuqdzsZJdK4ujXsxufPy0GbgAAqjlh870vdre8lp6HjKtfzDQF1AAAAkEAAAAAAAAAAAAAAAAAAxydG3VO52MkulcXRr2Y3Pn5aDNwAAVRyw+d6Tu1veS0tDxlWv5hoC8gAAAAAAAAAAAAAAAAAAAAAAY5Ojbqnc7GSXSuLo17Mbnz8tBm4AAKo5YfO9J3a3vJaWh4yrX8w0BeQAAAAAAAAAAAAAAAAAAAAAAMcnRt1TudjJLpXF0a9mNz5+WgzcAAFUcsPnek7tb3ktLQ8ZVr+YaAvIAAAAAAAEggAAAAAAAAAAAAAGOTo26p3Oxkl0ri6NezG58/LQZuAACqOWHzvSd2t7yWloeMq1/MNAXkAAAAAAAAAAAAAAAAAAAAAADHJ0bdU7nYyS6VxdGvZjc+floM3AABVHLD53pO7W95LT0PGVa/mGgLqAAAAAAAABles1mazGyazMTHqmJ2TAMQAAAAAAAAAAAAY5Ojbqnc7GSXSuLo17Mbnz8tBm4AAKo5YfO9J3a3vJaWh4yrX8w0BeQAAAAAAAPs/1XqPqrfc8dSnu9eGW1cofFPLptRl1mClr6XNa2XJ4ETM6fJPlt4UeisztmJ5o27PJ5NtfS34qpimZ/KEl23MTvGGkxK2hAAAAAAAAAAAAY5Ojbqnc7GSXSuLo17Mbnz8tBm4AAKo5YfO9L3a3vJaWh4SrX8w0BeQAAAAAANk4m8VM3CWalrUtXRVtE5s0xMReIny46T6Znm2+j7omvfvxbj/AGSW7c1T/C7f9GxfV4/2Ksjee63s/Vx1QXG7z3N2p3tqxwhSucnjJngAAAAAAAAAABjk6NuqdzsZJdK4ujXsxufPy0GbgAAqjlh870ndre8lp6HjKtfzDQF1AAAAAA+zgjzjF2oeLnGXqnLoXSf7rH/46boYc5XYfq46/9k='}} 
    style={{height:50, width:50}} />
</TouchableHighlight>
</View>

<View style={{width: 60, height: 60, backgroundColor: '#FFC300',alignItems:'center'}}>
        <Text></Text>
</View>

<View style={{width: 60, height: 60, backgroundColor: '#FFC300'}}>
        <TouchableHighlight 
  onPress={() => Linking.openURL('https://facebook.com')}>
  <Image 
    source={{uri:'data:image/png;base64,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'}} 
    style={{height:50, width:50}} />
</TouchableHighlight>
</View>

</View>




<View style={{flexDirection: 'row', alignItems: 'center',}}>
           <Text>

           </Text> 
          </View>




<View style={{flexDirection:'row',marginVertical:5}}>
<Text style={styles.tex}>

If you don't have an account ?
</Text>

<View style={{flex: 2, height:1, backgroundColor: 'black',width:2}} />

<Text style={{color:'blue',textAlign:'right'}}

onPress={()=>Linking.openURL('sign up')}>create an account from here</Text>

</View>
         
         






        </View>
        
      </KeyboardAvoidingView>
    );
  }
  login = () => {
    const { navigate } = this.props.navigation;
    fetch("http://127.0.0.1:8000/user/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(function(response) {
        if (response.status === 201) {
          var token = response.headers.get("Authorization");
          // var decoded = jwtDecode(token);
          // AsyncStorage.setItem("MyStoreUser", decoded.sub);
          navigate("SignUpScreen");
        }
         else {
          alert("Wrong email or password");
          return;
        }
      })
      .catch(function(err) {
        console.log("Fetch Error", err);
      });

       
  };

  /*loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("==> Login cancelled");
        } else {
          console.log(
            "==> Login success with permissions: " +
              result.grantedPermissions.toString()
          );
        }
       },
       function(error) {
        console.log("==> Login fail with error: " + error);
       }
     );
  }   */
  
  
  
}

            






const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#FFC300",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC300",
    paddingLeft: 40,
    paddingRight: 40
  },
  header: {
    fontSize: 35,
    marginBottom: 60,
    color: "#fff",
    fontWeight: "bold"
  },
  textInput: {
    alignSelf: "stretch",
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  btn: {
    alignSelf: "stretch",
    backgroundColor: "black",
    padding: 20,
    alignItems: "center"
  },
  bt: {
    color: "#fff",
    fontSize: 20,
    
  },
  continue:{
    color:'white',
    fontSize:18
},
bttn: {
  color: "#fff",
    fontSize: 20},


loginButtonTitle: {
      color: "#fff",
      fontSize: 20},


      text:{
        //textAlign:'right',
        fontWeight:'bold',
        fontSize:20
     },


     text:{
      //textAlign:'right',
      fontWeight:'bold',
      fontSize:20
   }

});