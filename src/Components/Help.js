import React from "react";

export default function Help() {
  return (
    <>
      <div className="text-center mt-5 fs-2">
        Get the Support You Need: Explore our Help Resources
      </div>
      <div className="video-play mt-3">
        <div className="row help-topic mt-2">
          <div className="help-text col-md ratio ratio-16x9">
            <div className="inner-help d-flex flex-column justify-content-center align-items-center">
              <div className="help-heading">
                Enhance Your Search Experience:
              </div>
              <ol>
                <li>Input your boarding location in the "Source" field.</li>
                <li>
                  Enter your desired destination in the "Destination" field.
                </li>
                <li>
                  Choose the date of your journey using the "Journey" input.
                </li>
                <li>
                  Finally, click the "Search" button to find your options.
                </li>
              </ol>
            </div>
          </div>
          <div className="video-body col-md">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/EZ3E6LfwQj8"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row help-topic mt-3">
          <div className="help-text col-md ratio ratio-16x9">
            <div className="inner-help d-flex flex-column justify-content-center align-items-center">
              <div className="help-heading">Effortlessly Book Your Trip:</div>
              <ol>
                <li>
                  Sign in to your website account to access the booking feature.
                </li>
                <li>Click on "Book Ticket" to initiate the booking process.</li>
                <li>Select your desired seats for the journey.</li>
                <li>Enter the necessary passenger information.</li>
                <li>
                  Click on "Confirm Reservation" to finalize your booking.
                </li>
                <li>Initiate payment to secure your reservation.</li>
              </ol>
            </div>
          </div>
          <div className="video-body col-md">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/L6zeoVaJVQY"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row help-topic mt-3">
          <div className="help-text col-md ratio ratio-16x9">
            <div className="inner-help d-flex flex-column justify-content-center align-items-center">
              <div className="help-heading">Streamline Your Bookings:</div>
              <ol>
                <li>
                  Visit the Manage Booking Page to access all your reservations.
                </li>
                <li>
                  Cancel a reservation by clicking "Cancel Booking." Confirm by
                  typing "cancel" in the dialog box. Note: Cancellations are not
                  possible on or after the day of the trip.
                </li>
                <li>
                  On the Manage Booking Page, you can also view and download
                  your receipt for reference.
                </li>
              </ol>
            </div>
          </div>
          <div className="video-body col-md">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/xndR570QgJQ"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row help-topic mt-3">
          <div className="help-text col-md ratio ratio-16x9">
            <div className="inner-help d-flex flex-column justify-content-center align-items-center">
              <div className="help-heading">
                Seamless Account Creation for Bus Ticket Bookings:
              </div>
              <ol>
                <li>Visit the SignUp page to create your account.</li>
                <li>
                  Fill in the details accurately and ensure that you provide the
                  correct email address and mobile number. These may be required
                  for future purposes.
                </li>
              </ol>
            </div>
          </div>
          <div className="video-body col-md">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/TkcTPhMdbRE"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row help-topic mt-3">
          <div className="help-text col-md ratio ratio-16x9">
            <div className="inner-help d-flex flex-column justify-content-center align-items-center">
              <div className="help-heading">
                Effortlessly Sign In and Reset Your Password:
              </div>
              <ol>
                <li>Visit the SignIn page to access your account.</li>
                <li>
                  In case you have forgotten your password, click on "Forgot
                  password".
                </li>
                <li>
                  Follow the instructions provided to reset your password and
                  create a new one.
                </li>
              </ol>
            </div>
          </div>
          <div className="video-body col-md">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/88qwSnTnCJo"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-dev d-flex flex-column justify-content-center align-items-center my-4">
        <div className="fs-5">Developer</div>
        <div className="fs-3">Viraj Raut</div>
        <div className="social-links">
          <a
            href="https://www.youtube.com/channel/UC0GeX2-aQJnGKmoVXA1WW6w"
            rel="noreferrer"
            target="_blank"
          >
            <i className="youtube"></i>
          </a>
          <a
            href="https://github.com/virajRaut25"
            rel="noreferrer"
            target="_blank"
          >
            <i className="git-hub"></i>
          </a>
          <a
            href="https://linkedin.com/in/viraj-raut"
            rel="noreferrer"
            target="_blank"
          >
            <i className="linked-in"></i>
          </a>
          <a
            href="https://twitter.com/thevirajraut"
            rel="noreferrer"
            target="_blank"
          >
            <i className="twitter"></i>
          </a>
        </div>
      </div>
    </>
  );
}
