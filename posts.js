/* ===== BLOG POSTS =====
   To add a new post, copy one block below and paste it at the TOP of the list.
   - slug: a short unique word-with-hyphens (no spaces)
   - date: YYYY-MM-DD
   - tag: a category such as Econometrics, Statistics, Data Analysis, Coding, Health Economics
   - summary: one or two sentences shown on the blog list
   - body: the full post in simple HTML (<p>, <h2>, <ul><li>, <pre> for code). Use backticks ` around it.
   The two posts below are samples. Replace or delete them. */
window.POSTS = [
{
  slug:"welcome",
  date:"2026-10-30",
  tag:"Announcements",
  title:"Welcome to my research blog",
  summary:"A short note on what I will share here: ideas from statistics, econometrics, data analysis and coding.",
  body:`<p>Welcome. This space is for short, practical notes from my teaching and research in economics.</p>
<h2>What to expect</h2>
<ul><li>Explanations of statistical and econometric ideas</li><li>Data analysis workflows in STATA and R</li><li>Notes on health, environmental and agricultural economics</li></ul>
<p>New posts will appear here regularly. You can also follow the EconStat page for more updates.</p>`
},
{
  slug:"heteroskedasticity",
  date:"2026-10-29",
  tag:"Econometrics",
  title:"Why heteroskedasticity matters in applied work",
  summary:"What it means when the variance of the error term is not constant, and the usual first fix.",
  body:`<p>In a regression, heteroskedasticity means the variance of the error term changes across observations. A common example is household spending, where richer households show more variation than poorer ones.</p>
<h2>Why it matters</h2>
<p>The OLS coefficients remain unbiased, but the usual standard errors are no longer reliable. That can make t-tests and confidence intervals misleading.</p>
<h2>A common first step</h2>
<p>Use heteroskedasticity-robust standard errors. In STATA:</p>
<pre>regress y x1 x2, vce(robust)</pre>
<p>Also plot the residuals against the fitted values to see whether the spread changes.</p>`
}
];
