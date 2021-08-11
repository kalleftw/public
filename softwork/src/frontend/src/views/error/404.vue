<template>
<div id="container">
  <img src="/404-logo.svg" alt="Softworks" id="error-logo">
</div>
</template>

<script>
export default {

}
</script>

<style>
  #container {
  width: 750px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#error-logo {
  max-width: 90%;
}

  @media only screen and (max-width: 600px) {
    #container {
      display: block;
    }
    
    #error-logo {
      width: 750px;
      max-width: 90%;
      margin: 50px 0 50px 0;
    }
  }
</style>