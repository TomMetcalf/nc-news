import { useEffect, useState } from 'react';
import { fetchTopics } from '../utils';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link } from 'react-router-dom';

export default function TopicList({ selectedTopic, setSelectedTopic }) {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchTopics()
      .then((topics) => {
        return topics;
      })
      .then((topics) => {
        setTopics(topics.topics);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <BeatLoader
        color={'#ffffff'}
        loading={isLoading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
        margin={20}
      />
    );
  }

  return (
    <main>
      <ul>
        {topics.map((topic) => {
          const { slug, description } = topic;

          return (
            <li key={slug}>
              <section className="topic-list-card">
                <h2>{slug}</h2>
                <p>{description}</p>
                <Link
                  to={`/topics/${slug}`}
                  onClick={() => {
                    setSelectedTopic(slug);
                  }}
                >
                  View articles on this topic
                </Link>
              </section>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
