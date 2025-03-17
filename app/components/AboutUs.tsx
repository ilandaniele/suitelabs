"use client";

import React, { useState, useEffect } from 'react';
import styles from '../styles/AboutUs.module.css';

const AboutUs = () => {
  const testimonials = [
    {
      text: "Collaborating with SuitsLabs has been a transformative experience for us. Their expertise in SEO strategies, particularly in SuiteCommerce Advanced, attention to detail, and speedy responses have helped improve our E-Commerce successes.",
      name: "Syna Shelfry",
      position: "Director of Technology, Regina Andrew"
    },
    {
      text: "We love working with the team at Suitetabs. They are incredibly responsive and creative. From backend scripting to SCA customizations, we highly recommend Suitetabs.",
      name: "Ben Argov",
      position: "President, IWA Wine Accessories"
    },
    {
      text: "We were referred to Suitetabs after migrating our website to SuiteCommerce and noticing a significant decline in traffic and sales. The team at Suitetabs stepped in and transitioned our site from recovery to growth within only a matter of a few months. Their helpfulness, knowledge and responsiveness are outstanding. They even identified and addressed a potential issue that we hadn't been aware of before it escalated. The personalized service Suitetabs provides is exceptional and not so easy to find anymore. We truly appreciate this. Working with Suitetabs, particularly with Diego, has been a positive experience, and we look forward to continuing to work with them.",
      name: "Keena Drummond",
      position: "Jelinek Cork Group"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.divider}></div>
      <h1 className={styles.title}>About us</h1>
      <p className={styles.description}>
        Suit&Labs is your premier choice for building and growing eCommerce businesses running on NetSuite eCommerce (SuiteCommerce). With a steadfast focus on SuiteCommerce development and Growth Marketing, Sent&Labs is your strategic partner for unlocking the full potential of your business.
        <br /><br />
        Backed by over nine years of expertise in the field, our team of seasoned professionals is dedicated to driving measurable results and delivering unparalleled value to our clients.
        <br /><br />
        Why are we different? We chose not to be sales driven to have the freedom of saying what needs to be sold, and do what’s right for our clients.
        <br /><br />
        Discover the SuiteLabs difference today and embark on a journey towards digital excellence. Welcome to a world of endless possibilities.
      </p>
      <h2 className={styles.trustTitle}>THEY TRUST US</h2>
      <div className={styles.divider}></div>
      <div className={styles.trustIcons}>
        <img src="https://dev.suitelabs.net/wp-content/uploads/2024/05/Clients-grey-2-05.png" alt="Client 1" />
        <img src="https://dev.suitelabs.net/wp-content/uploads/2024/05/Clients-grey-2_Mesa-de-trabajo-1.png" alt="Client 2" />
        <img src="https://dev.suitelabs.net/wp-content/uploads/2024/05/Clients-grey-2-02.png" alt="Client 3" />
        <img src="https://dev.suitelabs.net/wp-content/uploads/2024/05/Clients-grey-2-03.png" alt="Client 4" />
        <img src="https://dev.suitelabs.net/wp-content/uploads/2024/05/Clients-grey-2-04.png" alt="Client 5" />
      </div>
      <div className={styles.testimonialSection}>
        <button className={styles.arrow} onClick={prevTestimonial}>&lt;</button>
        <div className={styles.testimonialBox}>
          <p className={styles.testimonialText}>{testimonials[currentTestimonial].text}</p>
          <p className={styles.testimonialName}>{testimonials[currentTestimonial].name}</p>
          <p className={styles.testimonialPosition}>{testimonials[currentTestimonial].position}</p>
        </div>
        <button className={styles.arrow} onClick={nextTestimonial}>&gt;</button>
      </div>
    </div>
  );
};

export default AboutUs;