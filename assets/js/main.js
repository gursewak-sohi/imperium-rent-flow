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


    // Close Modal
    const closeModal = (closeBtn, modal) => {
        let closeLink = document.querySelector(closeBtn),
            modalItem = document.querySelector(modal);
        if (closeLink && modalItem) {
            closeLink.onclick = () => {
                modalItem.classList.remove("active");
            }
        }
    }
    closeModal('#closeModal', '#vipModal');


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


    // Process Flow
    if ($("#searchTypeBlock").length > 0) {
        $('#searchTypeBlock input[type="radio"]').on('change', function(e) {
            $("#chooseJetType").hide();
            $("#selectedJetType").hide();
            $("#multiTripBlock").find('.search-box').addClass('mutiple-search-box');
            $("#searchMultiTrip").show();
            let selectedVal = this.value;
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
            $(this).text('Change');
            $("#selectedJetType").hide();
            $("#chooseJetType").fadeIn();
        });
        $(document).on('click', '#searchMultiTrip', function(e) {
            $(this).hide();
            $("#multiTripBlock").find('.search-box').removeClass('mutiple-search-box');
            $("#selectedJetType").hide();
            $("#chooseJetType").fadeIn();
        });
        $(document).on('click', '#chooseJetBtn', function(e) {
            $("#chooseJetType").hide();
            $("#selectedJetType").fadeIn();
        });
        $(document).on('click', '#selectedJetBackBtn', function(e) {
            $("#selectedJetType").hide();
            $("#chooseJetType").fadeIn();
        });
    }


})();