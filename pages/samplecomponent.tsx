import { Tabs } from "flowbite";

/*
 * tabElements: array of tab objects
 * options: optional
 */
const tabs = new Tabs(tabElements, options);
// import UserIcon from "../components/UserIcon";
import DateSelector from "../components/Dateselector";
import MyCarousel from "../components/Carousel";

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

const samplecomponent = () => {
  return (
    
            
            {/* <ul>
              {myProjects?.map((proj: any) => {
                if (proj.author == myProfile.id) {
                  <li>
                    <Link href={`/projects/Viewpost/${proj.id}`}>
                      <Card item={{ title: proj.title, text: proj.text }} />
                    </Link>
                  </li>;
                }
              })}
            </ul> */}
            <h3 class="flex items-center text-5xl font-extrabold dark:text-white pb-3">
              Projects
            </h3>
            <div class="flex flex-wrap justify-center -mb-4 -mx-2">
              
            </div>
  );
};

export default samplecomponent;
