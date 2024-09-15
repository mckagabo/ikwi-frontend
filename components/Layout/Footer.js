import React, { useEffect,useState } from 'react';
import Facebook from "../../public/assets/Icon/facebook.svg";
import Twitter from "../../public/assets/Icon/twitter.svg";
import Instagram from "../../public/assets/Icon/instagram.svg";
import SocialMediaLinks from "../SocialMedia";
import { getStrapiURL } from '../../utils/util';
import qs from 'qs'
import { fetchData } from '../../utils/util';

const Footer = () => {
   const [addresses,setAddresses]=useState([]);
   const [logo,setLogo]=useState({})

   useEffect(()=>{
     const fetchFooter=async()=>{
      const data=await footerAttributes();
      const {Addresses,Logo}=data;
      let theAddresses=[];
      Addresses.map((address)=>{
        const oneAdrress={
          location:address.Location,
          address:address.phisicalAddress,
          phone:address.phone,
          email:address.email,
        }
      theAddresses.push(oneAdrress);
      })
     
     setAddresses(theAddresses);
      const {image}=Logo;
      const theUrl = image.data.attributes.url;
      const theLogo = {
        imageUrl:getStrapiURL()+''+theUrl || '', // Provide fallback in case URL is not available
        text: Logo.text|| '', // Safe access with fallback
        href: '/' || '', // Safe access with fallback
      };
     setLogo(theLogo);
     }
     fetchFooter()
   },[])

  async function footerAttributes(){
    const baseUrl=getStrapiURL();
    const path='/api/global'
    const query=qs.stringify({
      populate: {
        topnav: {
          populate:{
           logoLink:{
            populate:{
              image:{
               fields:["url",'alternativeText','name'],
             }
            }
           },
           link:{
           populate:true,
           }
          }
        },
         socialMedia:{
             populate:true
            },
          Footer:{
          populate:{
           
            Addresses:{
            populate:true
            },
            Logo:{
             populate:{
               image:{
                populate:true
               }     
             }, 
            }
          }
        }
      },
     
      publicationState: 'live',
      locale: ['en'],
    })

    const url=new URL(path,baseUrl);
    url.search=query;
   // const data=await fetchData(url.href);
   const data= await fetchData(url.href);
    return data.data.attributes.Footer;
  }


  return (
    <div className="bg-white-300 pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
       <a href='/'>
        <img src={logo.imageUrl} className="h-12 w-auto"/>
        </a>
          <p className="mb-4">
            <strong className="font-medium">{logo.text}</strong> 
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
          <SocialMediaLinks/>
          </div>
          <p className="text-gray-400">©{new Date().getFullYear()} - Ikwi Group</p>
        </div>
      
        <div className=" row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Address</p>   
            <ul className="text-black-500 ">
          <ul className="text-black-500 ">
              {addresses.map((address, index) => (
               <li key={index} className="my-2 hover:text-orange-500 cursor-pointer transition-all">
                 <b>{address.location}</b>
                 <p>{address.address}</p>
                 <p>{address.phone}</p>
                 <p>{address.email}</p>
                </li>
             ))} 
</ul>
        
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          {/* <p className="text-black-600 mb-4 font-medium text-lg">Engage</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              LaslesVPN ?{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              FAQ{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tutorials{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              About Us{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Privacy Policy{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Terms of Service{" "}
            </li>
          </ul> */}
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          {/* <p className="text-black-600 mb-4 font-medium text-lg">Earn Money</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Affiliate{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Become Partner{" "}
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
