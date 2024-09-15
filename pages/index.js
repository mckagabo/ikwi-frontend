import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import { getStrapiURL } from "../utils/util";
import qs from 'qs';
import { fetchData } from "../utils/util";
import React, { useState, useEffect } from "react";
export default function Home() {

  const [headTitle,setHeadTitle]=useState();
  const [hero,setHero]=useState({});
  const [ourProjectCard,setOurProjectCard]=useState([]);
  const [siteDescription,setSiteDescription]=useState();
  const [ourServices,setOurservices]=useState({});
  const [ourTeam,setOurTeam]=useState({});
  const [beforeFooter,setBeforeFooter]=useState({});
  const [ourTestimonies,setOurTestimonies]=useState({});
  const [aboutUs,setAboutUs]=useState({});
  const [serviceBlocks,setServiceBlocks]=useState([]);
  const [partners,setPartners]=useState([]);

  useEffect(()=>{
     const homePageValues=async ()=>{
      const data=await homePageAttributes();
      const {Hero,title,description,services,team,aboutus,serviceBlock,OurPartners}=data;
      const heroSection={
         heading:data.Hero?.heading ||'',
         description:data.Hero?.text ||'',
         image:getStrapiURL()+''+Hero?.image?.data?.attributes?.url || '',
         linkTitle:data.Hero.link?.title||'',
         linkType:data.Hero.link?.type||'',
         linkHref:data.Hero.link?.link||''
        
      }
      let thePartners=[];
      OurPartners.map((partner)=>{
        const onePartner={
           name:partner.companyName,
           logo:getStrapiURL()+''+partner.companyLogo.data?.attributes?.url||''
        }
        thePartners.push(onePartner);
      })
     setPartners(thePartners);

      let theServiceBlocks=[];
       serviceBlock.map((service,index)=>{
        const oneService={
          image:getStrapiURL()+''+service.serviceImage?.data?.attributes?.url,
          heading:service.heading,
          elements:service.serviceElement,
        }
        theServiceBlocks.push(oneService);
       })
    
      setServiceBlocks(theServiceBlocks);
      const serviceSection={
          heading:services?.heading,
          description:services?.description
      }
      setOurservices(serviceSection);
     
      const teamSection={
        heading:team.heading,
        description:team.description,
        
      }
     setOurTeam(teamSection);
   
  
      setHero(heroSection);
      setHeadTitle(title);
      setSiteDescription(description);
      const aboutUsSection={
        heading:aboutus?.heading||'',
        description:aboutus?.description||'',
        image:getStrapiURL()+''+aboutus.aboutusImage.data.attributes?.url||'',
      };
      setAboutUs(aboutUsSection);
     
     }
     homePageValues();
  },[])

  async function homePageAttributes(){
      const baseUrl=getStrapiURL();
        const path='/api/home-page';
        const query=qs.stringify(
          {
            populate:{
              Hero:{
                populate:{
                  link:{
                   populate:true
                  },
                  image:{
                   populate:true
                  }
                }
              },
            
              services:{
                populate:true,
             },
             OurPartners:{
               populate:{
                 companyLogo:{
                  populate:true
                 }
               }
             },
             serviceBlock:{
               populate:{
                 serviceElement:{
                  populate:true
                 },
                 serviceImage:{
                  populate:true
                 }
               }
             }
             , team:{
               populate:true,
              },
              aboutus:{
               populate:{
                 aboutusImage:{
                populate:true
                }
               },
              },
              footerSection:{
               populate:true,
               footerbutton:{
                populate:true
               }
              },
              Row:{
                populate:{
                  card:{
                    populate:{
                      image:{
                      populate:true
                      }
                    }
                  }
                }
              }
            }
           }
            )
        const url=new URL(path,baseUrl);
        url.search=query;
       // const data=await fetchData(url.href);
       const data= await fetchData(url.href);
       return data.data.attributes;
  }
  return (
    <>
     <SeoHead title={siteDescription} />
      <Layout>
        <Hero description={hero.description} heading={hero.heading} buttonText={hero.linkTitle} heroImage={hero.image}/>
        <Feature ourService={ourServices} ourTeam={ourTeam} aboutUs={aboutUs}/>
        <Pricing ourService={ourServices} ourTeam={ourTeam}  serviceBlock={serviceBlocks} partners={partners}/>
      </Layout>
    </>
  );
}
