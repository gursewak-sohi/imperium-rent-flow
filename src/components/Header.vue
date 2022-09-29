<template>
    <header class="home-header">
        <div class="container">
            <!-- Home Header -->
            <nav class="header-nav">
                <a class="logo" target="_blank" href="https://www.bytheseat.com/">
                    <img src="/assets/images/logo.png" width="132" height="51" alt="icon"/>
                </a>

                <div class="header-toggle-items">
                    <div class="buttons">
                        <a href="javascript:;" class="btn btn-primary btn-sm btn-iconed">
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.5 2.67908C6.986 2.67908 2.5 7.16508 2.5 12.6791V16.8221C2.5 17.8461 3.397 18.6791 4.5 18.6791H5.5C5.76522 18.6791 6.01957 18.5737 6.20711 18.3862C6.39464 18.1986 6.5 17.9443 6.5 17.6791V12.5361C6.5 12.2709 6.39464 12.0165 6.20711 11.829C6.01957 11.6414 5.76522 11.5361 5.5 11.5361H4.592C5.148 7.66608 8.478 4.67908 12.5 4.67908C16.522 4.67908 19.852 7.66608 20.408 11.5361H19.5C19.2348 11.5361 18.9804 11.6414 18.7929 11.829C18.6054 12.0165 18.5 12.2709 18.5 12.5361V18.6791C18.5 19.7821 17.603 20.6791 16.5 20.6791H14.5V19.6791H10.5V22.6791H16.5C18.706 22.6791 20.5 20.8851 20.5 18.6791C21.603 18.6791 22.5 17.8461 22.5 16.8221V12.6791C22.5 7.16508 18.014 2.67908 12.5 2.67908Z"
                                    fill="white"/>
                            </svg>
                            Call
                            <span>support center</span>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
    import Lightgallery from 'lightgallery/vue';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom';

    export default {
        name : 'App',
        components : {
            Lightgallery
        },
        data : () => ({
            plugins: [lgZoom, lgThumbnail]
        }),
        methods : {
            handleScroll() {
                let header = document.querySelector(".home-header");
                if (window.scrollY > 100 && !header.className.includes('active')) {
                    header.classList.add('active');
                } else if (window.scrollY < 100) {
                    header.classList.remove('active');
                }
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);

        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    };
</script>