import Image from "next/image";

import Tangerine from "./drawn.jpg";
import kid from "./kid.png";
import styles from "./page.module.css";

export default function about() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          We bring the good news - <span>Moos</span>
        </h1>
      </div>
      <div className={styles.about}>
        <div className={styles.aboutUs}>
          <p>
            Moos is where curiosity meets creativity. Our platform is a place where people from all walks of life come
            to explore, learn, and express themselves. We believe that everyone has a story to tell and unique insights
            to share. That&#39;s why we offer a space that is open and inclusive, where anyone can contribute and be
            heard.
          </p>
          <p>
            Our mission is to inspire and empower our community by providing a platform for meaningful conversations and
            thought-provoking content. We strive to create a space where new perspectives and ideas can flourish, and
            where people can connect with one another in meaningful ways.
          </p>
          <p>
            At Moos, we are committed to fostering a culture of authenticity, integrity, and creativity. We believe that
            great ideas can come from anyone, and we are dedicated to supporting the voices of both established and
            emerging writers. Our platform is designed to promote quality content, free from the pressures of
            advertising and commercial interests.
          </p>
          <p>
            Join us on a journey of discovery, growth, and creativity. Together, we can build a vibrant community that
            celebrates diversity, curiosity, and the power of ideas.
          </p>
        </div>
        <div className={styles.tangerineBox}>
          <Image src={Tangerine} alt="tangerine" className={styles.tangerine} />
        </div>
      </div>
      <div className={styles.team}>
        <h2>Fresh and Juicy</h2>
        <p className={styles.teamP}>
          Our platform is open to anyone who wants to write, whether you&#39;re a thought-leader, journalist, expert, or
          simply an individual with a unique perspective. You&#39;ll discover content from independent writers around
          the world, as well as stories handpicked by our team of editors and contributions from leading authors.
        </p>
        <div className={styles.membersContainer}>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              thebeatlesphan
            </div>
          </div>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              ba
            </div>
          </div>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              hmansour
            </div>
          </div>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              Joe B
            </div>
          </div>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              7ordan
            </div>
          </div>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              JoseAE
            </div>
          </div>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              Krod518
            </div>
          </div>
          <div className={styles.members}>
            <div className={styles.teamMember}>
              <Image src={kid} alt="kid avatar" width={25} className={styles.memberAvatar} />
              Manye (Manny)
            </div>
          </div>
        </div>
      </div>
      <div className={styles.reviews}>
        <h2>An Active International Community</h2>
        <div className={styles.carouselReview}>
          <h3>Anonymous</h3>
          <p>&quot;I love getting my &apos;Moos&apos; here&quot; hahah hihi hoho</p>
        </div>
      </div>
    </div>
  );
}
