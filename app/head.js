import React from 'react';

export default function Head() {
  return (
    <head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="icon" href="/angel.png" />
      <meta property="og:title" content="Moodly" />
      <meta
        property="og:description"
        content="Track your daily mood every day with Moodly"
      />
      <meta property="og:image" content="/path/to/image.jpg" />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:type" content="website" />
    </head>
  );
}
