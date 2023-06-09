import Image from "next/image";

import AuthorCard from "@/components/AuthorCard/AuthorCard";
import Tangerine from "@/public/drawn.jpg";
import kid from "@/public/kid.png";
import moose from "@/public/moose.png";
import styles from "./page.module.css";

export default function about() {
  const team = [
    {
      authorAvatar: kid,
      displayName: "thebeatlesphan",
      blog: "Bob's Law Blog",
      authorDescription: "Tangerine Moose is a whimsical children's book about a moose who loves tangerines.",
      authorLinks: ["x", "y", "z"],
    },
    {
      authorAvatar: kid,
      displayName: "hmansour",
      blog: "I don't write blogs",
      authorDescription:
        "When the other animals in the forest make fun of him, he sets out on a journey to find other tangerine-loving creatures.",
      authorLinks: ["x", "y", "z"],
    },
    {
      authorAvatar: kid,
      displayName: "ba",
      blog: "ba ba ba bad",
      authorDescription: "Along the way, he discovers that being different is something to celebrate, not hide.",
      authorLinks: ["x", "y", "z"],
    },
    {
      authorAvatar: kid,
      displayName: "Joe B",
      blog: "This is my Blog",
      authorDescription:
        "As the tangerine moose travels through the forest, he encounters a variety of animals who tease him for his unusual color.",
      authorLinks: ["x", "y", "z"],
    },
    {
      authorAvatar: kid,
      displayName: "Manye (Manny)",
      blog: "wuz up blog",
      authorDescription:
        "But with the help of his new friend, a wise old owl, the moose learns to embrace his uniqueness and find confidence in himself.",
      authorLinks: ["x", "y", "z"],
    },
    {
      authorAvatar: kid,
      displayName: "JoseAE",
      blog: "Blog Blog",
      authorDescription:
        "Along the way, the tangerine moose and his companions have fun adventures and learn valuable lessons about self-acceptance and the importance of kindness towards others.",
      authorLinks: ["x", "y", "z"],
    },
    {
      authorAvatar: kid,
      displayName: "Kahlin",
      blog: "Kahlin",
      authorDescription:
        "With colorful illustrations and a heartwarming story, 'Tangerine Moose' is a book that children and adults alike will love.",
      authorLinks: ["x", "y", "z"],
    },
    {
      authorAvatar: kid,
      displayName: "7ordan",
      blog: "Kahlin's Real Blog",
      authorDescription: "This has been a story by the Tangerine Moose Team!",
      authorLinks: ["x", "y", "z"],
    },
  ];

  const handleTeam = () => {
    return team.map((member) => (
      <AuthorCard
        authorAvatar={member.authorAvatar}
        displayName={member.displayName}
        blog={member.blog}
        authorDescription={member.authorDescription}
        authorLinks={member.authorLinks}
        key={member.displayName}
        className={styles.member}
      />
    ));
  };

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
        <h2>Meet The Team</h2>
        <p className={styles.teamP}>
          Our platform is open to anyone who wants to write, whether you&#39;re a thought-leader, journalist, expert, or
          simply an individual with a unique perspective. You&#39;ll discover content from independent writers around
          the world, as well as stories handpicked by our team of editors and contributions from leading authors.
        </p>
        <div className={styles.membersContainer}>{handleTeam()}</div>
      </div>
      <div className={styles.comments}>
        <div className={styles.commentsHeader}>Over 100 million readers and growing.</div>
        {/* TODO: use CommentCard */}
        <div className={styles.randomComment}>random user comment - by randomUser</div>
      </div>
      <div className={styles.footer}>
        <Image src={moose} width={250} alt="Moos Logo" />
        <h3>Moos</h3>
      </div>
    </div>
  );
}
