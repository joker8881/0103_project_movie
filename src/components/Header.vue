<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapState,mapActions } from 'pinia';
export default{
    data(){
        return{
        }
    },
    components:{
        RouterLink,
    },
    computed:{
        home(){
            this.$router.push('/')
        },
        about(){
            this.$router.push('/about')
        },
        c(){
            this.$router.push('/VtextAndVmodel')
        },
    }
}
</script>

<template>
    <div class="headerShow">
        <div class="box">
            <RouterLink to="/" class="a" :class="{'cass': this.location === 1}" >Home</RouterLink>
            <RouterLink to="/about" class="a" :class="{'cass': this.location === 2}">About</RouterLink>
            <RouterLink :to="`/login`" class="a" :class="{'cass': this.location === 16}">記帳表單</RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">

.headerShow{
    // overflow: scroll;
    // display:flex
    height: 100%;
    width: 100%;
    .box{
        display:flex;
        text-align: center;
        widows: 100%;
        height: 100%;
        background-color: #525f75;
        .a{
            // margin-top: 20px;
            height: 70%;
            width: 450px;
            line-height: em;
            font-size: 2em;
            text-decoration: none;
            white-space:nowrap;
            transition: 0.4s;
            color: whitesmoke;
            border-radius: 5px;
            &:hover{
                background-color: gainsboro;
                color:darkslategray;
                transform:scale(1.1,1.1);
            }
        }
    }
}

.cass{
    background-color: rgb(125, 125, 255);
    color: white;
    border-radius: 5px;
    transition: 0.6s;
}

</style>