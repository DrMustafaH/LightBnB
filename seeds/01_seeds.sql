INSERT INTO
  users (name, email, password)
VALUES
  (
    'Eva Stanley',
    'sebastianguerra@ymail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Louisa May',
    'narutosan@batail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Justin Dan',
    'hitman3@yahmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Pickle Pan',
    'coderack@tmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );

INSERT INTO
  properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES
  (
    1,
    'Port Sudan',
    'description',
    'https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiqlOGJmM3uAhXMpJ4KHbobB6MQPAgI',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1920px-Googleplex_HQ_%28cropped%29.jpg',
    200,
    1,
    3,
    5,
    'Canada',
    '234 5th ave',
    'Vancouver',
    'BC',
    41412,
    true
  ),
  (
    2,
    'Marble Island',
    'description',
    'https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiqlOGJmM3uAhXMpJ4KHbobB6MQPAgI',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1920px-Googleplex_HQ_%28cropped%29.jpg',
    300,
    1,
    2,
    3,
    'Canada',
    '24 fraiser st',
    'Burnaby',
    'BC',
    42315,
    true
  ),
  (
    2,
    'lucky charm',
    'description',
    'https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiqlOGJmM3uAhXMpJ4KHbobB6MQPAgI',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1920px-Googleplex_HQ_%28cropped%29.jpg',
    250,
    1,
    1,
    2,
    'Canada',
    '5693 Mayfair',
    'Calgary',
    'AB',
    85422,
    true
  ),
  (
    3,
    'McPalace',
    'description',
    'https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiqlOGJmM3uAhXMpJ4KHbobB6MQPAgI',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1920px-Googleplex_HQ_%28cropped%29.jpg',
    350,
    2,
    2,
    3,
    'Canada',
    '712 Whisler Crt',
    'Mississauga',
    'Ontario',
    65437,
    true
  );

INSERT INTO
  reservations (guest_id, property_id, start_date, end_date)
VALUES
  (1, 1, '2018-09-11', '2018-09-26'),
  (2, 2, '2019-01-04', '2019-02-01'),
  (3, 3, '2021-10-01', '2021-10-14'),
  (3, 3, '2021-10-06', '2021-11-05');

INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (1, 2, 1, 4, 'message'),
  (3, 1, 3, 7, 'message'),
  (1, 3, 4, 6, 'message'),
  (2, 1, 2, 9, 'message');