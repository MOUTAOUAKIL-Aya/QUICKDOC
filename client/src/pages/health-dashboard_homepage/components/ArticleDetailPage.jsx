import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import Footer from '../../../components/ui/Footer';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Données complètes des articles (vous pourrez les déplacer dans une API plus tard)
  const allArticles = [
    {
      id: 1,
      title: "5 Ways to Boost Your Immune System This Winter",
      description: "Discover natural methods to strengthen your body's defenses",
      fullContent: `
        <h2>Introduction</h2>
        <p>As winter approaches, keeping your immune system strong becomes crucial. Here are five scientifically-backed methods to boost your immunity during the colder months.</p>
        
        <h2>1. Prioritize Sleep</h2>
        <p>Quality sleep is essential for immune function. Aim for 7-9 hours per night. Create a sleep routine by going to bed and waking up at consistent times.</p>
        
        <h2>2. Stay Hydrated</h2>
        <p>Drink plenty of water throughout the day. Proper hydration helps your body naturally eliminate toxins and bacteria.</p>
        
        <h2>3. Eat Colorful Fruits and Vegetables</h2>
        <p>Foods rich in vitamins and antioxidants support immune health. Include citrus fruits, berries, leafy greens, and bell peppers in your diet.</p>
        
        <h2>4. Manage Stress</h2>
        <p>Chronic stress weakens the immune system. Practice meditation, deep breathing, or yoga to reduce stress levels.</p>
        
        <h2>5. Regular Exercise</h2>
        <p>Moderate exercise boosts circulation and immune cell activity. Aim for 30 minutes of activity most days of the week.</p>
        
        <h2>Conclusion</h2>
        <p>By incorporating these simple habits into your daily routine, you can strengthen your immune system naturally and stay healthier throughout winter.</p>
      `,
      category: "Wellness",
      readTime: "5 min read",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16d76a857-1764755886682.png",
      imageAlt: "Fresh fruits",
      author: "Dr. Sarah Johnson",
      publishDate: "January 15, 2024",
      tags: ["immunity", "wellness", "winter health", "prevention"]
    },
    {
      id: 2,
      title: "Understanding Blood Pressure: What Your Numbers Mean",
      description: "Learn how to interpret your blood pressure readings",
      fullContent: `
        <h2>Understanding Your Blood Pressure Numbers</h2>
        <p>Blood pressure readings consist of two numbers: systolic (top number) and diastolic (bottom number).</p>
        
        <h2>Systolic Pressure</h2>
        <p>The systolic number measures the pressure in your arteries when your heart beats. This is the higher number in your reading.</p>
        
        <h2>Diastolic Pressure</h2>
        <p>The diastolic number measures the pressure in your arteries between heartbeats, when your heart is resting.</p>
        
        <h2>Blood Pressure Categories</h2>
        <ul>
          <li><strong>Normal:</strong> Less than 120/80 mmHg</li>
          <li><strong>Elevated:</strong> 120-129/less than 80 mmHg</li>
          <li><strong>Hypertension Stage 1:</strong> 130-139/80-89 mmHg</li>
          <li><strong>Hypertension Stage 2:</strong> 140+/90+ mmHg</li>
          <li><strong>Hypertensive Crisis:</strong> Higher than 180/120 mmHg</li>
        </ul>
        
        <h2>Tips for Healthy Blood Pressure</h2>
        <p>Maintain a healthy weight, reduce sodium intake, exercise regularly, limit alcohol, and manage stress.</p>
      `,
      category: "Heart Health",
      readTime: "7 min read",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18fdc3d89-1765186858638.png",
      imageAlt: "Blood pressure monitor",
      author: "Dr. Michael Chen",
      publishDate: "February 3, 2024",
      tags: ["heart health", "blood pressure", "hypertension", "cardiovascular"]
    },
    {
      id: 3,
      title: "Ramadan Health Guide: Fasting Safely and Healthily",
      description: "Expert tips for maintaining wellness during the holy month",
      fullContent: `
        <h2>Preparing for Ramadan</h2>
        <p>Start adjusting your sleep and meal schedules a few days before Ramadan begins.</p>
        
        <h2>Suhoor (Pre-dawn Meal)</h2>
        <p>Choose complex carbohydrates, proteins, and healthy fats to sustain energy throughout the day.</p>
        
        <h2>Iftar (Breaking Fast)</h2>
        <p>Break your fast with dates and water, then have a balanced meal including vegetables, protein, and whole grains.</p>
        
        <h2>Hydration Strategies</h2>
        <p>Drink plenty of water between Iftar and Suhoor. Avoid caffeinated and sugary drinks that can cause dehydration.</p>
        
        <h2>Exercise During Ramadan</h2>
        <p>Light to moderate exercise is recommended. Best times are after Iftar or before Suhoor.</p>
        
        <h2>Managing Medical Conditions</h2>
        <p>Consult with your doctor about medication schedules if you have chronic conditions like diabetes or hypertension.</p>
      `,
      category: "Seasonal",
      readTime: "6 min read",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b170332b-1764819939835.png",
      imageAlt: "Iftar meal",
      author: "Dr. Amina Hassan",
      publishDate: "March 1, 2024",
      tags: ["ramadan", "fasting", "nutrition", "spiritual health"]
    }
  ];

  useEffect(() => {
    // Simuler un chargement d'API
    setTimeout(() => {
      const foundArticle = allArticles.find(article => article.id === parseInt(id));
      setArticle(foundArticle);
      
      // Articles similaires (exclure l'article actuel)
      const related = allArticles
        .filter(a => a.id !== parseInt(id) && a.category === foundArticle?.category)
        .slice(0, 2);
      setRelatedArticles(related);
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon name="FileQuestion" size={36} color="var(--color-primary)" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Link to="/health-tips" className="text-primary hover:text-primary/80 font-medium">
              ← Back to Health Tips
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Bouton retour */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* En-tête de l'article */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {article.category}
              </span>
              <span className="text-sm text-muted-foreground">{article.readTime}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{article.publishDate}</span>
            </div>
          </div>

          {/* Image principale */}
          <div className="mb-8">
            <Image 
              src={article.image} 
              alt={article.imageAlt}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Contenu de l'article */}
          <article className="prose prose-lg max-w-none mb-12">
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.fullContent }}
            />
          </article>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Articles similaires */}
          {relatedArticles.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link 
                    key={related.id}
                    to={`/article/${related.id}`}
                    className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {related.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{related.readTime}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {related.description}
                    </p>
                    <span className="text-primary text-sm font-medium flex items-center gap-1">
                      Read article
                      <Icon name="ArrowRight" size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA pour plus d'articles */}
          <div className="text-center border-t border-border pt-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Want to read more?</h3>
            <p className="text-muted-foreground mb-6">Discover more health tips and articles in our wellness library.</p>
            <Link
              to="/health-tips"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Icon name="BookOpen" size={18} />
              Browse All Articles
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;