import React, { useEffect, useState } from "react";
import Navbar from '../../components/Navbar/Navbar';
// import ResponsiveAppBar from "@/components/Navbar/Navbar";
import {db} from '../../firebase';
import { firestore } from '../../firebase'; 
import { collection, getDoc, doc } from 'firebase/firestore';
import { ElevatorSharp } from "@mui/icons-material";
import firebase from 'firebase/app';
import 'firebase/database';
import WhatWeDoCard from '../../components/WhatWeDoCard/WhatWeDoCard'
import AdPopup from "@/components/AdPopup/AdPopup";
import Footer from "@/components/Footer/Footer";
// import Ramadan from "@/components/Ramadan/Ramadan";
import WhoWeAre from '@/components/WhoWeAre/WhoWeAre'
import Image from "next/image";
import Ramadan from "@/components/Ramadan/Ramadan";
import BannerCard from "@/components/BannerCard/BannerCard";
import DonatePopup from "@/components/DonatePopup/DonatePopup";
import { CiMail } from "react-icons/ci";
import { useRouter } from "next/router";
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import summercamp2Image from '../assets/summercamp2.jpeg'
import { SiGmail } from "react-icons/si";
const values = [
    {
        img: '/assets/Logo3.jpg',
        title: 'Emergency Relief',
        des: 'We issue rescue and relief services to those in danger and at immediate risk of harm. We also focus on developing and upgrading our capacity to link relief and rehabilitation with long term development.',
        id: 1,
    },
    {
        img: '/assets/Logo1.jpg',
        id: 2,
        title: 'Sustainable livelihoods',
        des: 'Our long-term development programmes build independent, brighter futures. We enable marginalised communities to live with dignity through restoring livelihood opportunities, improving agriculture '
    },
    {
        img: '/assets/Logo2.jpg',
        id:3,
        title: 'Education',
        des: 'We believe in providing everyone with access to education to all. In particular, our focus is to enable girls to attend school – thereby creating opportunities to break out of the cycle of poverty for future generations.'
    },
    {
        img: '/assets/Logo4.jpg',
        id: 4,
        title: 'Healthcare',
        des: 'Ur medical and health care programmes save and protect lives across the world. Key priorities of our healthcare intervention is the promotion of good health and well-being of children and mothers with a focus on combating the major causes of childhood deaths and diseases.'
    }
]

const ads = [
    {
        id: 1,
        description: "For Sponsorship / Ads Please contact 9500489492",
        video: 'link1',
        title: 'Ads / Sponsors',
        image: 'img1',
    },
    {
        id: 2,
        description: "For Sponsorship / Ads Please contact 9500489492",
        video: 'link1',
        title: 'Ads / Sponsors',
        image: 'img2',
    },
    {
        id: 3,
        description: "For Sponsorship / Ads Please contact 9500489492",
        video: 'link1',
        title: 'Ads / Sponsors',
        image: 'img1',
    },
    {
        id: 4,
        description: "For Sponsorship / Ads Please contact 9500489492",
        video: 'link1',
        title: 'Ads / Sponsors',
        image: 'img1',
    },
]

const Home = () => {

    const [sponsors, setSponsors] = useState([]);
    const [adPopupVisible, setAdPopupVisible] = useState(false);
    const [adNumber, setAdNumber] = useState(0);
    const [adCount, setAdCount] = useState(0);
    const [adsDetails, setAdsDetails] = useState([])
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  

    const closeAdPopup = () => {
        setAdPopupVisible(false);
      };

      

        const fetchAds = async() => {
            try{
               
            let adsContent = [];
            const adsCollection = collection(db, "Ads");
            const adsDoc = doc(adsCollection, "adsDetails");

            const docSnapshot = await getDoc(adsDoc);

            if(docSnapshot.exists()){
                const adsData = docSnapshot.data();
                console.log(adsData, "hello");
                adsContent = adsData.ads;
                
                console.log(adsContent);
                setAdsDetails(adsContent);
                console.log(adsDetails)
            }
            else{
                console.log("No ads Data available")
            }
        }
        catch (error){
            console.log("error fetching ads data", error);
        }
        }


    const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Attach event listener when component mounts
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [visitorCount, setVisitorCount] = useState(0);

  const router = useRouter();
 

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                let data = [];
                const sponsorsCollection = collection(db, "Web Content"); // Collection reference
                const sponsorsDoc = doc(sponsorsCollection, "sponsors"); // Document reference
                
                console.log("hi");

                const docSnapshot = await getDoc(sponsorsDoc);

                if(docSnapshot.exists()){
                    const sponsorsData = docSnapshot.data();
                    data = sponsorsData.sponsors_list;
                    if(data.length>0){
                    console.log(data);
                    console.log("hello");
                    console.log(data[0].img_url)
                    setSponsors(data);
                    }
                    
                    
                }else{
                    console.log("No data available");
                }

                
            } catch (error) {
                console.error("Error getting sponsors data:", error);
            }
        };

        fetchSponsors();
    }, []);

    useEffect(() => {
        const adPopupInterval = setInterval(() => {
            if (ads.length > 0) {
                setAdPopupVisible(true);
                // setAdCount(prevCount => prevCount + 1);
                setAdNumber(prevNumber => (prevNumber + 1) % ads.length);
                console.log(adNumber);
            } else {
                clearInterval(adPopupInterval); // Clear the interval after showing the ad popup three times
                console.log("xero")
            }
        }, 240* 1000);
    
        return () => clearInterval(adPopupInterval); // Cleanup function to clear the interval when component unmounts or rerenders
    }, [adNumber]); 

    return (
        <div className="bg-gray-100 overflow-x-hidden">
            <Navbar />
<div className="bg-gray-100">

      
      {(adPopupVisible && adsDetails) && (
        <AdPopup
          title={ads[adNumber].title}
          description={ads[adNumber].description}
          onClose={closeAdPopup}
          adLink={ads[adNumber].image}
          videoLink={ads[adNumber].video}
        />
      )}
    </div>

    <div className="text-center overflow-y-auto">
            
            {/* <ResponsiveAppBar /> */}
            
            <div
  className="bg-cover bg-center  relative flex items-start relative p-16 justify-center text-white"
  style={{
    backgroundImage: 'url("https://res.cloudinary.com/dchbfnlct/image/upload/v1711042512/mosque-615415_1280_vamdua.jpg")',
  }}
>


<div className="absolute inset-0 bg-[#222226] py-10 px-8 opacity-70 "></div>
    
  {/* Overlay div for background image */}
  <div className="absolute z-20  lg:py-4 lg:px-8 ">

  <div className="flex items-center justify-center  inset-0 outline-none z-50 gap-5 logos">
                    <a href="https://wa.me/919487044247" target="_blank" >
                    <button className="mx-2 p-2 bg-[#25D366] text-white rounded-full cursor-pointer">
                        <FaWhatsapp />
                    </button>
                    </a>
                    <a href="mailto:islamiakalvisangam@gmail.com" target="_blank" >
                    <button className="mx-2 p-2 bg-white text-red-600 rounded-full cursor-pointer ">
                    <SiGmail />
                    </button>
                    </a>
                    <a href="https://www.instagram.com/islamiya_kalvi_sangam" target="_blank" >
                    <button  className="mx-2 p-2 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full cursor-pointer">
                        <FaInstagram />
                    </button>
                    </a> 
                    <a href="https://www.facebook.com/islamiya.kalvi.sangam" target="_blank" >
                    <button  className="mx-2 p-2 bg-[#1877F2] text-white rounded-full cursor-pointer">
                        <FaFacebook />
                    </button>
                 </a>
                </div>

  </div>

  

  <div className="absolute sm:text-center sm:w-[100vw] flex flex-col justify-center  items-center relative ">
  <div className="flex justify-start relative mt-24">
  {/* <Image src="/assets/Logo8.png" className="h-[100px] align-start w-[300px] mt-4 mb-45" width={100} height={100} alt="img" /> */}
  <h1 className="text-black text-[36px] font-extrabold font-serif">﷽</h1>
  </div>
  <div className="flex flex-col justif-center items-center">
    <Image src="https://res.cloudinary.com/dchbfnlct/image/upload/v1711188558/fit_size_fit_xmjifp.png" className="h-[250px] w-[250px] mt-4" width={150} height={100} alt="img" />
    <p className="text-4xl text-white font-extrabold mb-4 mt-8">Islamiya Kalvi Sangam</p>
    <p className="text-xltext-white">
        Seeking Excellence In Islamic Knowledge and Practice.
    </p>
    <button className="bg-[#2dad5c] h-[40px] w-[125px] border-1 mt-8 rounded-md text-white hover:scale-105" onClick={togglePopup}>Donate</button>
    {showPopup && <DonatePopup onClosePopup={togglePopup} />}
    </div>

  
  </div>

 
</div>


        </div>

        


    <section id="About" className="flex flex-col m-auto justify-center items-center px-10 w-[85vw]">
        <button className="text-white bg-[#2dad5c] rounded-md w-[130px] h-[40px] mt-5 hover:scale-105" onClick={() => router.push("/Announcements")}>Announcements</button>

        <div className="w-[80vw]  my-12">
            <Image src={summercamp2Image} className="w-[100%] cursor-pointer hover:scale-105 h-[500px] lg:h-[630px]" width={913} height={1280} alt="summercamp banner" onClick={()=>router.push("/SummerCamp")}/>
        </div>

        <h1 className="text-bold text-[45px] text-[#2dad5c] font-bold mt-8 md:mt-24 mb-8 sm:mr-auto">Our Mission</h1>
        <h3 className="text-black text-xl my-8">
        The Islamic Foundation is primarily a 
        charity dedicated to research, publications, education, community support and inter-faith dialogue. we aim for:
        </h3>
        <div className="text-black text-lg mb-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    <li>
        <div className={`bg-white border-[#2dad5c] border-2 rounded p-8 shadow-lg cursor-pointer hover:bg-[#c5decc] hover:border-2 hover:scale-105 hover:border-[#2dad5c] `}>
            Research and present authentic Islamic knowledge and practice as a way of moderation.
        </div>
    </li>
    <li>
        <div className={`bg-white border-[#2dad5c] border-2 rounded p-8 shadow-lg cursor-pointer hover:bg-[#c5decc] hover:border-2 hover:scale-105 hover:border-[#2dad5c] `}>
            Provide educational and training programmes to enhance knowledge, expertise, character and citizenship skills.
        </div>
    </li>
    <li>
        <div className={`bg-white border-[#2dad5c] border-2 rounded p-8 shadow-lg cursor-pointer hover:bg-[#c5decc] hover:border-2 hover:scale-105 hover:border-[#2dad5c] `}>
            Develop endowment and support services to strengthen family and community.
        </div>
    </li>
    <li>
        <div className={`bg-white border-[#2dad5c] border-2 rounded p-8 shadow-lg cursor-pointer hover:bg-[#c5decc] hover:border-2 hover:scale-105 hover:border-[#2dad5c] `}>
            Participate in inter and intra-faith dialogue to promote understanding and peaceful co-existence.
        </div>
    </li>
</ul>

        </div>
    </section>

  <div className="">
    <WhoWeAre />
</div>

    <Ramadan />

    <section id="values">
        <div className="container mx-auto">
        <h1 className="text-center font-bold text-[#2dad5c] text-3xl my-12">What We Do</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 gap-8 2xl:grid-cols-4">
            {values.map((each, idx) => (
                <WhatWeDoCard img={each.img} title={each.title} des = {each.des} key={idx}/>
            ))}
        </div>
        </div>
    </section>

    

    <section className="bg-[#f0e2d5] py-16 my-16">
    <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-[#2dad5c] text-center">Our Sponsor</h2>
        {/* <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-x-auto"> */}
        <div className="flex justify-center overflow-x-auto">

        {sponsors.length === 0 ? (
                <p className="text-center text-[#696855] text-2xl lg:text-4xl font-semibold w-[80vw] mx-auto mb-8">
                    For Sponsorship/Ads: Contact 9500489492
                </p>
                ) : (
                sponsors.map((each, idx) => (
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center mx-auto mx-8" key={idx}>
                    <Image src="/" alt='Image' className="mx-auto mb-4 h-16 w-auto h-[150px] w-[175px]" width={300} height={200} />
                    </div>
                ))
                )}
        </div>
    </div>
</section>

<h3 className="text-center text-[#696855] text-xl font-semibold w-[80vw] mx-auto mb-8">
‘The believers, in their love, mutual kindness, and close ties, are like one body; when any part complains, the whole body responds to it with wakefulness and fever.‘ 
</h3>

    <div className="flex justify-center mb-3">
      <h2 className="text-[#2c5c2d] font-bold text-[22px] font-bold">Number of Visitors: 87,564</h2>
    </div>

<div id="footer">
<Footer />
</div>
    </div>
    )
}

export default Home;
