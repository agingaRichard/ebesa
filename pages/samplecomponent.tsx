// import { Tabs } from "flowbite";

// /*
//  * tabElements: array of tab objects
//  * options: optional
//  */
// const tabs = new Tabs(tabElements, options);
// // import UserIcon from "../components/UserIcon";
// import DateSelector from "../components/Dateselector";
// import MyCarousel from "../components/Carousel";

// function openCity(evt, cityName) {
//   var i, tabcontent, tablinks;
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("tablinks");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// const samplecomponent = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CustomCarousel
//           data={dummyData}
//           renderItem={({ item }) => {
//             return (
//               <View style={styles.container}>
//                 <Image
//                   source={{ uri: item.img }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />

//                 <View style={styles.content}>
//                   <Text style={styles.title}>{item.title}</Text>
//                   <Text style={styles.description}>{item.description}</Text>
//                   <Text style={styles.extraDesc}>{item.price}</Text>
//                 </View>
//               </View>
//             );
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default samplecomponent;
