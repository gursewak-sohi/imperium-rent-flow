(function() {

    // Animate Floating Header On Scroll
    const header = document.querySelectorAll("header");
    if (header.length > 0) {
        window.onscroll = () => scrollFunction();
        const scrollFunction = () => {
            for (var i = 0; i < header.length; i++) {
                if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                    header[i].classList.add('active');
                } else {
                    header[i].classList.remove('active');
                }
            }
        }
    }

    // Toggle Menu
    const toggleMenu = (toggleID, toggleNav) => {
        let toggleLink = document.querySelector(toggleID),
            toggleItem = document.querySelector(toggleNav);
        if (toggleLink && toggleItem) {
            toggleLink.onclick = () => {
                if (toggleItem.classList.contains('active')) {
                    toggleItem.classList.remove("active");
                } else {
                    toggleItem.classList.add("active");

                }
            }
        }
    }
    toggleMenu('#toggleBtn', '#toggleNav');




    // Gallery Swiper
    const gallerySwiperID = document.getElementById('gallerySwiper');
    if (gallerySwiperID) {
        const gallerySwiper = new Swiper('#gallerySwiper', {
            pagination: {
                el: '#gallerySwiper .swiper-pagination',
            },
            navigation: {
                nextEl: '#gallerySwiper .swiper-button-next',
                prevEl: '#gallerySwiper .swiper-button-prev',
            },
        });
    }



    // Show Dropdown 
    const showDropdowns = (dropdownLinkID, dropdownContentID) => {
        let dropDownLink = document.querySelectorAll(dropdownLinkID),
            dropDownContent = document.querySelectorAll(dropdownContentID);

        window.onclick = () => {
            dropDownLink.forEach(el => {
                el.classList.remove("active");
            });
            dropDownContent.forEach(el => {
                el.classList.remove("active");
            });
        }

        if (dropDownLink && dropDownContent) {
            const openDropDown = el => {
                el.stopPropagation();
                let selectedLink = el.currentTarget.classList,
                    showId = el.currentTarget.dataset.dropdown,
                    currentDropdown = document.querySelector("#" + showId);

                if (selectedLink.contains('active')) {
                    selectedLink.remove("active");
                    currentDropdown.classList.remove("active");
                } else {
                    dropDownLink.forEach(el => {
                        el.classList.remove("active");
                    });
                    dropDownContent.forEach(el => {
                        el.classList.remove("active");
                    });
                    selectedLink.add("active");
                    currentDropdown.classList.add("active");
                }
            }
            dropDownLink.forEach(el => {
                el.addEventListener("click", openDropDown);
            });
        }
    }
    showDropdowns('[data-dropdown]', '.dropdown');



    // Light Gallery in Lightbox
    var gallery = document.querySelectorAll('.light-gallery');
    if (gallery.length) {
        for (var i = 0; i < gallery.length; i++) {
            lightGallery(gallery[i], {
                plugins: [lgZoom, lgThumbnail],
                speed: 500,
                download: false,
                zoom: false,
                mobileSettings: {
                    controls: true,
                    showCloseIcon: true,
                },
            });
        }
    }

    // Trigger Gallery click on Button
    const playGallery = document.querySelectorAll('.play-gallery');
    if (playGallery.length) {
        for (var i = 0; i < playGallery.length; i++) {
            playGallery[i].onclick = (el) => {
                el.currentTarget.closest('.light-gallery-wrapper').querySelector('a').click();
            }
        }
    }
    // Get textarea count
    $(document).on('keyup', '.count-area', function() {
        $(this).parent().find(".count").text($(this).val().length);
    });

    // Get Qoute 
    if ($("#getQouteModal").length > 0 && $("#confirmModal").length > 0) {
        $("#getQouteBtn").click(function() {
            $("#getQouteModal").addClass('active');
        });
        $('[data-close="qoute-modal"]').click(function() {
            $("#getQouteModal").removeClass('active');
        });
        $("#submitQouteBtn").click(function(e) {
            e.preventDefault();
            $("#getQouteModal").removeClass('active');
            $("#confirmModal").addClass('active');
        });
        $('[data-close="confirm-modal"]').click(function() {
            $("#confirmModal").removeClass('active');
        });
    }

    // Process Flow
    if ($("#searchTypeBlock").length > 0) {
        $('#searchTypeBlock input[type="radio"]').on('change', function(e) {
            $("#chooseJetType").hide();
            $("#selectedJetType").hide();
            $('[data-trip="round"]').addClass('step-1').removeClass('step-2 step-3');
            $('[data-trip="multiple"]').addClass('step-1').removeClass('step-2 step-3');
            $('.mutiple-search-button').show();
            $("#searchMultiTrip").show();
            let selectedVal = this.value;
            if (selectedVal == 'one-way') {
                $("#multiTripBlock").hide();
                $("#roundTripBlock").fadeIn();
            }
            if (selectedVal == 'round-trip') {
                $("#multiTripBlock").hide();
                $("#roundTripBlock").fadeIn();
            }
            if (selectedVal == 'multi-trip') {
                $("#roundTripBlock").hide();
                $("#multiTripBlock").fadeIn();
            }
        });
        $(document).on('click', '#searchRoundTrip', function(e) {
            $('[data-trip="round"]').addClass('step-2').removeClass('step-1');
            $("#selectedJetType").hide();
            $("#chooseJetType").fadeIn();
        });
        $(document).on('click', '#searchMultiTrip', function(e) {
            $(this).hide();
            $('[data-trip="multiple"]').addClass('step-2').removeClass('step-1');
            $("#selectedJetType").hide();
            $("#chooseJetType").fadeIn();
        });
        $(document).on('click', '#chooseJetBtn', function(e) {
            $('[data-trip="round"]').addClass('step-3').removeClass('step-2');
            $('[data-trip="multiple"]').addClass('step-3').removeClass('step-2');
            $('.mutiple-search-button').hide();
            $("#chooseJetType").hide();
            $("#selectedJetType").fadeIn();
        });
        $(document).on('click', '#selectedJetBackBtn', function(e) {
            $('[data-trip="round"]').addClass('step-2').removeClass('step-3');
            $('[data-trip="multiple"]').addClass('step-2').removeClass('step-3');
            $('.mutiple-search-button').fadeIn();
            $("#selectedJetType").hide();
            $("#chooseJetType").fadeIn();
        });
    }




})();