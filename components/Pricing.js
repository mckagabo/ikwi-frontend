

import Testimoni from "./Testimoni";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import 'swiper/css';          // Import Swiper base styles
import 'swiper/css/navigation';  // Import specific Swiper modules (navigation)
import 'swiper/css/pagination'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { getStrapiURL } from "../utils/util";
import qs from 'qs';
import { fetchData } from "../utils/util";
import React, { useEffect, useMemo, useState } from "react";
import Team from "./Team";


const Pricing = ({ourService,ourTeam,beforFooter,serviceBlock,partners}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [services,setServices]=useState([]);
  const [teamMembers,setTeamMembers]=useState([]);
  const [testimonials,setTestimonials]=useState([]);

    useEffect(()=>{
      const strapiQueries=async()=>{
        let  serviceList=[];
        const allTheServices=await allServices();
        allTheServices.map((service)=>{
          const oneService={
            title:service.attributes.serviceName,
            description:service.attributes.serviceDescription,
            icon:getStrapiURL()+service.attributes.serviceImage.data.attributes.url

          }
          serviceList.push(oneService);

          setServices(serviceList);
        
        })
        let theTestimonies=[]
        const allTheTestimonies=await allTestimonies();
        allTheTestimonies.map((testimoni)=>{
          const oneTestimoni=  {
            name: testimoni.attributes.name,
            image:getStrapiURL()+testimoni.attributes.image.data.attributes?.url,
            city: testimoni.attributes.city,
            country: testimoni.attributes.country,
            rating: testimoni.attributes.rating,
            testimoni:testimoni.attributes.testimony
                   }
               theTestimonies.push(oneTestimoni);
        })
        setTestimonials(theTestimonies);
        const allTheTeams = await allMembers();
        if (allTheTeams && allTheTeams.length > 0) {
          let theMembers = [];
          allTheTeams.map((member) => {
            const oneMember = {
              name: member.attributes.name,
              position: member.attributes.role,
              image: getStrapiURL() + member.attributes.teamMemberImage.data.attributes.url,
              social: {
                linkedin: member.attributes.linkedin,
                twitter: member.attributes.xhandle,
                github: "https://github.com/johndoe",
              },
            };
            theMembers.push(oneMember);
          });
          setTeamMembers(theMembers);
          console.log("Team members fetched successfully:", theMembers);
        }
      }
      strapiQueries();
    },[])
 


 const allServices=async()=>{
  const baseUrl=getStrapiURL();
  const path='/api/services'
  const query=qs.stringify({
    populate:{
    serviceImage:{
       populate:true
      }
    }
  })
  const url=new URL(path,baseUrl);
  url.search=query;
 // const data=await fetchData(url.href);
 const data= await fetchData(url.href);
  return data.data;
 }

 const allMembers=async()=>{
  const baseUrl=getStrapiURL();
  const path='/api/team-members'
  const query=qs.stringify({
    populate:{
    teamMemberImage:{
       populate:true
      }
    }
  })
  const url=new URL(path,baseUrl);
  url.search=query;
 // const data=await fetchData(url.href);
 const data= await fetchData(url.href);
  return data.data;
 }

 const allTestimonies=async()=>{
  const baseUrl=getStrapiURL();
  const path='/api/testimonials'
  const query=qs.stringify({
    populate:{
    image:{
       populate:true
      }
    }
  })
  const url=new URL(path,baseUrl);
  url.search=query;
 // const data=await fetchData(url.href);
 const data= await fetchData(url.href);
  return data.data;
 }

 const imageList = [
  { src: "/assets/Icon/amazon.png", alt: "Amazon", height: "h-14" },
  { src: "/assets/Icon/netflix.png", alt: "Netflix", height: "h-14" },
  { src: "/assets/Icon/reddit.png", alt: "Reddit", height: "h-12" },
  { src: "/assets/Icon/discord.png", alt: "Discord", height: "h-14" },
  { src: "/assets/Icon/spotify.png", alt: "Spotify", height: "h-12" },
];
  return (
    <div
      className="bg-gradient-to-b from-white-100 to-white-500 w-full py-14"
      id="pricing"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
           {ourService?.heading||'Our services.'}
          </h2>
          <p className="mt-3 text-lg text-black-500">
            {ourService?.description||''}
          </p>
              {/* Swiper for the slider */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {serviceBlock.map((service, index) => (
            <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Container to center the image */}
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-500 mb-4 mx-auto">
                {/* Image centered inside the container */}
                <img src={service.image} alt={service.heading} className="h-16 w-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {service.heading}
               
              </h3>
            
                    {/* Looping through the service.elements list */}
      {service.elements.map((key, elementIndex) => (
        <ul key={elementIndex} className="flex items-center mb-2">
          {/* Tick Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-green-500 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-black-500 line-clamp-4">
            {key.inputText}
          </p>
        </ul>
      ))} 
             
            </div>
          </SwiperSlide>
          ))}
        </Swiper>


        </div> 
                    

        </div>
    <div className="flex flex-col w-full my-16">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto">
              Our partners{" "}
            </motion.h3>
            <motion.p className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12" variants={scrollAnimation}>
              Our trusted partners
            </motion.p>
          </ScrollAnimationWrapper>
          {/* <ScrollAnimationWrapper>
            <motion.div className="py-12 w-full px-8 mt-16" variants={scrollAnimation}> 
             
            </motion.div>
          </ScrollAnimationWrapper> */}
          <ScrollAnimationWrapper>
          <motion.div className="w-full flex justify-evenly items-center mt-4 flex-wrap lg:flex-nowrap" variants={scrollAnimation}>
      {partners.map((partner, index) => (
         <div
          key={index}
          className="flex flex-col items-center flex-shrink-0"
         style={{ flexBasis: "20%" }} // Flex basis to fit images horizontally
          >
       <img
        src={partner.logo}
         className='h-14 w-auto mt-4 lg:mt-2'
         alt={partner.name}
       />
      <p className="mt-2 text-black-600 text-sm font-semibold">
        {partner.name}
      </p>
     </div>
    ))}
  </motion.div>
 </ScrollAnimationWrapper>
 </div>
 <div className="flex flex-col w-full my-16" id='team'>
  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
    {ourTeam?.heading}
  </h3>
  <p className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12">
    {ourTeam?.description}
  </p>
  <motion.div variants={scrollAnimation}>
  {teamMembers.length > 0 ? (
    <Team members={teamMembers} />
  ) : (
    <p>Loading team members...</p> // Placeholder until the data is fetched
  )}
</motion.div>
</div>

    {/* <div className="flex flex-col w-full my-16" id='team'>
           <ScrollAnimationWrapper>
        <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
            {ourTeam?.heading}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              {ourTeam?.description}
            </motion.p>
            <motion.div variants={scrollAnimation}>
            <Team members={teamMembers} />
            </motion.div>
       </ScrollAnimationWrapper>
         
     </div> */}
         <div className="flex flex-col w-full my-16" id="testimoni">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
              Trusted by Thousands of Happy Customer{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              These are the stories of our customers who have joined us with great
              pleasure when using this crazy feature.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="w-full flex flex-col py-12">
            <motion.div variants={scrollAnimation}>
              <Testimoni listTestimoni={testimonials}/>
            </motion.div>
          </ScrollAnimationWrapper>
        
        </div>
        {/*  <div className="flex flex-col w-full my-16" id="testimoni">
          
          
         <ScrollAnimationWrapper className="relative w-full mt-16">
            <motion.div variants={scrollAnimation} custom={{duration: 3}}>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                  <h5 className="text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    Subscribe Now for <br /> Get Special Features!
                  </h5>
                  <p>Let's subscribe with us and find the fun.</p>
                </div>
                <ButtonPrimary>Get Started</ButtonPrimary>
              </div>
              <div
                className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
                ></div>
            </motion.div>
          </ScrollAnimationWrapper> 
        </div>*/}
      </div>
    </div>
  );
};

export default Pricing;
