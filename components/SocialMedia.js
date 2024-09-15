import React, { useEffect,useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, XSquare } from 'lucide-react';
import { getStrapiURL } from '../utils/util';
import qs from 'qs'
import { fetchData } from '../utils/util';


const SocialMediaLinks = () => {
    const[socialUrls,setSocialUrls]=useState({});

    useEffect(()=>{
      const fetchUrls=async()=>{
        const data=await socialMediaUrls();
        const {x,youtube,Linkedin,instagram,facebook}=data;
        const urlObject={
              x,
              youtube,
              Linkedin,
              instagram,
              facebook
        }
       setSocialUrls(urlObject);
      }
     fetchUrls();
    },[])

    const socialMediaLinks = [
        { name: 'Facebook', icon: Facebook, url: socialUrls.facebook },
        { name: 'Twitter', icon: XSquare, url: socialUrls.x },
        { name: 'Instagram', icon: Instagram, url: socialUrls.instagram},
        { name: 'LinkedIn', icon: Linkedin, url: socialUrls.Linkedin },
        { name: 'YouTube', icon: Youtube, url: socialUrls.youtube},
      ];
    async function socialMediaUrls(){
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
        return data.data.attributes.socialMedia;
      }

  return (
    <div className="flex justify-center items-center space-x-4 py-4">
      {socialMediaLinks.map((social) => (
         <a
         key={social.name}
         href={social.url}
         target="_blank"
         rel="noopener noreferrer"
         className="text-[#D65600] hover:text-orange-500 transition-colors duration-300"
         aria-label={`Follow us on ${social.name}`}
       >
         <social.icon size={24} />
       </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;