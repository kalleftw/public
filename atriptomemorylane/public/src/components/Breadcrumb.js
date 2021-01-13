import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

/**
 * Breadbrumbs...
 * @param {} props 
 */
const BreadCrumb = (props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/Memories">
        Memories
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};


export default BreadCrumb