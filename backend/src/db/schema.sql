
-- Create users table for authentication
CREATE TABLE IF not exists users (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create results table to store the provided dataset
CREATE TABLE IF not exists results (
                         id INT PRIMARY KEY,
                         title VARCHAR(255) NOT NULL,
                         description TEXT,
                         category ENUM('Articles', 'Reports', 'Profiles') NOT NULL,
                         author VARCHAR(255),
                         organization VARCHAR(255),
                         location VARCHAR(255),
                         published_date DATE,
                         url VARCHAR(255),
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookmarked_results table
CREATE TABLE IF not exists bookmarked_results (
                                    id INT PRIMARY KEY AUTO_INCREMENT,
                                    user_id INT NOT NULL,
                                    result_id INT NOT NULL,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    FOREIGN KEY (user_id) REFERENCES users(id),
                                    FOREIGN KEY (result_id) REFERENCES results(id),
                                    UNIQUE KEY unique_bookmark (user_id, result_id)
);

CREATE TABLE IF not exists search_cache (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              search_term VARCHAR(255) NOT NULL,
                              category VARCHAR(50),
                              results JSON,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              INDEX idx_search_term_category (search_term, category)
);

INSERT IGNORE INTO results (id, title, description, category, author, published_date, url)
VALUES
    (1, 'Understanding Machine Learning', 'A comprehensive guide to machine learning fundamentals.', 'Articles', 'John Doe', '2020-08-01', 'https://example.com/machine-learning'),
    (2, 'Clinical Trials in Oncology', 'Overview of recent clinical trials in oncology.', 'Reports', 'Jane Smith', '2021-05-15', 'https://example.com/oncology-trials'),
    (3, 'Profile of Dr. Alice Johnson', 'Key opinion leader in immunology and clinical research.', 'Profiles', NULL, NULL, 'https://example.com/alice-johnson'),
    (4, 'Advances in Renewable Energy', 'Innovations in renewable energy technologies.', 'Articles', 'Mike Green', '2019-11-22', 'https://example.com/renewable-energy'),
    (5, 'Impact of AI in Medicine', 'How artificial intelligence is transforming healthcare.', 'Reports', 'Sarah Lee', '2022-01-10', 'https://example.com/ai-medicine'),
    (6, 'Profile of Dr. Richard Kim', 'Specialist in cardiology and cardiovascular research.', 'Profiles', NULL, NULL, 'https://example.com/richard-kim'),
    (7, 'Big Data in Healthcare', 'Analyzing how big data is reshaping healthcare systems.', 'Articles', 'Linda White', '2018-07-14', 'https://example.com/big-data-healthcare'),
    (8, 'Clinical Trials for Diabetes', 'Latest advancements in diabetes treatments through clinical trials.', 'Reports', 'Tom Harris', '2020-11-25', 'https://example.com/diabetes-trials'),
    (9, 'Profile of Dr. Clara Singh', 'Pioneer in neuroscience and brain research.', 'Profiles', NULL, NULL, 'https://example.com/clara-singh'),
    (10, 'Exploring Renewable Energy Sources', 'Diverse sources of renewable energy and their applications.', 'Articles', 'James Brown', '2021-04-10', 'https://example.com/renewable-energy-sources'),
    (11, 'Impact of AI in Business', 'Understanding the role of AI in transforming businesses.', 'Articles', 'Emily Green', '2022-02-20', 'https://example.com/ai-business'),
    (12, 'Clinical Trials for Cancer', 'A review of clinical trials targeting cancer treatment.', 'Reports', 'Michael Carter', '2019-06-30', 'https://example.com/cancer-trials'),
    (13, 'Profile of Dr. Nathan Cho', 'Leading researcher in pediatric medicine.', 'Profiles', NULL, NULL, 'https://example.com/nathan-cho'),
    (14, 'Breakthroughs in Biotechnology', 'Recent breakthroughs in biotechnology and their implications.', 'Articles', 'Sophia Adams', '2020-03-05', 'https://example.com/biotechnology'),
    (15, 'Clinical Trials for Alzheimer''s Disease', 'Progress in Alzheimer''s research through clinical trials.', 'Reports', 'David Kim', '2021-12-01', 'https://example.com/alzheimers-trials'),
    (16, 'Profile of Dr. Lisa Chan', 'Renowned specialist in infectious diseases.', 'Profiles', NULL, NULL, 'https://example.com/lisa-chan'),
    (17, 'Advances in Renewable Energy Storage', 'New technologies in renewable energy storage solutions.', 'Articles', 'Oliver Zhang', '2022-05-08', 'https://example.com/energy-storage'),
    (18, 'Impact of Blockchain in Healthcare', 'Analyzing blockchain''s role in enhancing healthcare transparency.', 'Articles', 'Anna Taylor', '2019-09-21', 'https://example.com/blockchain-healthcare'),
    (19, 'Clinical Trials for Cardiovascular Health', 'Research into improving cardiovascular health through trials.', 'Reports', 'Samuel Wilson', '2020-02-15', 'https://example.com/cardiovascular-trials'),
    (20, 'Profile of Dr. Ethan Carter', 'Expert in environmental health and public policy.', 'Profiles', NULL, NULL, 'https://example.com/ethan-carter');
