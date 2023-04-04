"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Markdown from "marked-react";

import PostButtons from "./PostButtons";
import Reactions from "./Reactions";
import styles from "./page.module.css";

// mock data + api: ignore for now
const fetchMockData = (slug) => ({
  postId: 1234,
  authorUsername: "TestUser",
  slug: slug,
  updated: new Date(Date.now() - 60000),
  created: new Date(2023, 1, 1, 12, 12, 12),
  title: "Test Blog Post",
  text: `# Non durum magni sinit Scythides lapidem tu

  ## Verba sidus

  Lorem *markdownum regesta* est hoc purpureum inrita tribuere: a et illa a suos
  audacia. Sudantibus infecit est posse dea obvius quae nece lusisse frons illi
  voce detur ab pectora pectore, cui.

  1. Illam fac nec quae generis mihi tempora
  1. At utilis sequerere glandes totidemque coepit recanduit
  1. Quam fratribus densi
  1. Sed tuas primus pectora tellusque proceres nominis
  1. Solvit tibi fando sparsosque tela additur contigerant

  Utque Iovis ubi poplite hosti meumque postes mitto, protegat montibus parabat
  Penelopae ad! Aequora nostris praenuntia, quorum, cum ademit nidus, unde in,
  Camenis. Nunc Troiae, maculatum medio modo maior constitit pocula, praebentque
  falsi. Accedere tu fuit arreptum tegemus et pariterque nostra autem mihi Ulixem,
  cultis. Cretus aequora nectareis ante adhibet fulgura *ante* minus extremum
  tenus.

  ## Gravi fuerat saevit reddere huic aequor

  Non servat in quaerit neque. Innectere petunt frustra.

      midiOutput(modem_zero_rte, skin, storageDpi * footer(5, halfPlagiarismDevice));
      web_drop_networking.dnsDefragment = down + spoofingMatrix;
      truncate += 2;
      var interactive_ugc = threadingBurnMeta(torrent_text_definition);

  Non luget protinus sensit ignes: ullus *Sisyphe indutus*, dubites matrona nondum
  omnipotens manus, quare rursus timidas. Venerem quicumque idemque oppida
  sanguine, Pegason cultu, nunc admonuisse, ubi merito femina, solito inter;
  Orionis. Ferat mollesque nataque.
  * [relative test link](/blog/test-blog-post-2)
  * [absolute test link](https://vercel.com/)

  **Prolem manus**, nec in reminiscitur malum, hoc fors niveis. Est echidnis fera
  ille tenet te Peleus tenet dea lamentabile festaque digiti dictis? Est per
  ferrugine ipse, nata it dixi superi de praestantissima. Ferox procul mea tollere
  illis.`,
  reactions: { "👍": 2, "👎": 1, "👏": 1 },
});
const getAuthorName = (_id) => "Test User";
const useCurrentUser = () => ({ name: useSearchParams().get("user") }); // `?user=TestUser` in URL to test author view
// mock end

const Blog = () => {
  const path = usePathname();
  var slug = path.match(/.*\/([-a-z0-9]+)/i)[1];
  const [data, setData] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const data = fetchMockData(slug);
    setData(data);
  }, [slug]);

  if (!data) return <div>loading...</div>;
  if (data) {
    const { title, text, authorUsername, slug, created, updated, reactions } = data;
    const authorName = getAuthorName(authorUsername);
    const isAuthor = currentUser.name === authorUsername;

    return (
      <>
        <a href="/">{/* replace with Header/Navbar component */}← Back to Home</a>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.text}>
            <Markdown value={text} />
            <div className={styles.reacts}>
              <Reactions reactions={reactions} />
            </div>
          </div>
          <p>
            {`submitted ${created.toLocaleString()} (last edited ${updated.toLocaleString()}) by `}{" "}
            <a href={`/user/${authorUsername}`}>{authorName}</a>
          </p>
          <PostButtons slug={slug} isAuthor={isAuthor} />
        </div>
      </>
    );
  }
};

export default Blog;
