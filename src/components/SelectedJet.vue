<template>
    <div id="selectedJetType" class="selected-jet-wrapper" style="display: none;">
                        <div class="selected-jet-block">
                            <div id="gallerySwiper" class="swiper selected-jet-image light-gallery-wrapper">
                                <div class="swiper-wrapper result-gallery-top light-gallery">
                                    <a class="result-image swiper-slide" href="assets/images/home/gallery/3.jpg" data-lg-size="1200-857">
                                        <img alt="Image 1" src="assets/images/home/gallery/3.jpg" />
                                    </a>
                                    <a class="result-image swiper-slide" href="assets/images/home/gallery/2.jpg" data-lg-size="1200-857">
                                        <img alt="Image 2" src="assets/images/home/gallery/2.jpg" />
                                    </a>
                                    <a class="result-image swiper-slide" href="assets/images/home/gallery/1.jpg" data-lg-size="1200-857">
                                        <img alt="Image 3" src="assets/images/home/gallery/1.jpg" />
                                    </a>
                                </div>
                                <!-- If we need pagination -->
                                <div class="swiper-pagination"></div>
                                <button class="btn play-gallery">
                                    <img src="assets/images/svg/gallery-btn.svg" alt="icon" />
                                </button>
                                <div class="gallery-text">
                                    <h5>PILATUS PC-12/45</h5>
                                    <p>8 Passengers <span>&bull;</span> Light</p>
                                </div>
                            </div>
                            <div class="selected-jet-content">
                                <div class="selected-jet-description">
                                    <ul>
                                        <li>
                                            <h5>Departure Airport</h5>
                                            <h6>Ben Gurion Intl (TLV) </h6>
                                        </li>
                                        <li>
                                            <h5>Arrival Airport</h5>
                                            <h6>Ben Gurion Intl (TLV) </h6>
                                        </li>
                                        <li>
                                            <h5>Passangers</h5>
                                            <h6>4 </h6>
                                        </li>
                                        <li>
                                            <h5>Aircraft Type</h5>
                                            <h6>Light, Heavy </h6>
                                        </li>
                                        <li>
                                            <h5>Est Flight time</h5>
                                            <h6>4:00 hrs</h6>
                                        </li>
                                    </ul>
                                </div>
                                <div class="selected-jet-timing">
                                    <div class="form-group">
                                        <label>Departure Time</label>
                                        <div class="select-unit">
                                            <select name="" id="" required="">
                                                    <option value="" disabled="" selected="" hidden="">5:00 PM</option>
                                                    <option value="">5:00 PM</option>
                                                    <option value="">5:00 PM</option>
                                                    <option value="">5:00 PM</option>
                                                    <option value="">5:00 PM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Arrival Time</label>
                                        <div class="select-unit">
                                            <select name="" id="" required="">
                                                    <option value="" disabled="" selected="" hidden="">9:00 PM</option>
                                                    <option value="">9:00 PM</option>
                                                    <option value="">9:00 PM</option>
                                                    <option value="">9:00 PM</option>
                                                    <option value="">9:00 PM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="timing-buttons">
                                        <button id="selectedJetBackBtn" type="button" class="btn btn-dark-outline btn-md">Back</button>
                                        <button id="getQouteBtn" type="button" class="btn btn-primary btn-iconed-lg btn-md">Get Quote <img src="assets/images/svg/next.svg" alt="icon"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</template>