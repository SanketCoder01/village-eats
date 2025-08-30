export const categories = [
  {
    id: '1',
    name: 'Fast Food',
    nameMarathi: 'फास्ट फूड',
    icon: '🍔',
    image: '/images/fastfood.jpg'
  },
  {
    id: '2',
    name: 'Pizza',
    nameMarathi: 'पिझ्झा',
    icon: '🍕',
    image: '/images/pizza.jpg'
  },
  {
    id: '3',
    name: 'Drinks',
    nameMarathi: 'पेये',
    icon: '🥤',
    image: '/images/drinks.jpg'
  },
  {
    id: '4',
    name: 'Ice Cream',
    nameMarathi: 'आइसक्रीम',
    icon: '🍦',
    image: '/images/icecream.jpg'
  }
]

export const restaurants = [
  {
    id: '1',
    name: 'Village Dhaba',
    nameMarathi: 'गाव ढाबा',
    image: '/images/village-dhaba.jpg',
    rating: 4.5,
    deliveryTime: '30-45 min',
    categories: ['1', '3'],
    menu: [
      {
        id: '1',
        name: 'Vada Pav',
        nameMarathi: 'वडा पाव',
        price: 25,
        image: '/images/vadapav.jpg',
        description: 'Traditional Mumbai street food'
      },
      {
        id: '2',
        name: 'Misal Pav',
        nameMarathi: 'मिसळ पाव',
        price: 60,
        image: '/images/misalpav.jpg',
        description: 'Spicy curry with bread'
      },
      {
        id: '3',
        name: 'Chai',
        nameMarathi: 'चहा',
        price: 15,
        image: '/images/chai.jpg',
        description: 'Traditional Indian tea'
      }
    ]
  },
  {
    id: '2',
    name: 'Pizza Corner',
    nameMarathi: 'पिझ्झा कॉर्नर',
    image: '/images/pizza-corner.jpg',
    rating: 4.2,
    deliveryTime: '25-40 min',
    categories: ['2'],
    menu: [
      {
        id: '4',
        name: 'Margherita Pizza',
        nameMarathi: 'मार्गेरिटा पिझ्झा',
        price: 180,
        image: '/images/margherita.jpg',
        description: 'Classic cheese pizza'
      },
      {
        id: '5',
        name: 'Veggie Supreme',
        nameMarathi: 'वेजी सुप्रीम',
        price: 250,
        image: '/images/veggie-supreme.jpg',
        description: 'Loaded with vegetables'
      }
    ]
  },
  {
    id: '3',
    name: 'Cool Treats',
    nameMarathi: 'कूल ट्रीट्स',
    image: '/images/cool-treats.jpg',
    rating: 4.7,
    deliveryTime: '15-25 min',
    categories: ['4'],
    menu: [
      {
        id: '6',
        name: 'Kulfi',
        nameMarathi: 'कुल्फी',
        price: 30,
        image: '/images/kulfi.jpg',
        description: 'Traditional Indian ice cream'
      },
      {
        id: '7',
        name: 'Vanilla Softy',
        nameMarathi: 'व्हॅनिला सॉफ्टी',
        price: 25,
        image: '/images/vanilla-softy.jpg',
        description: 'Soft serve ice cream'
      }
    ]
  }
]

export const generalStoreItems = [
  {
    id: 'gs1',
    name: 'Notebook',
    nameMarathi: 'वही',
    price: 25,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    description: 'A4 size ruled notebook'
  },
  {
    id: 'gs2',
    name: 'Pen Set',
    nameMarathi: 'पेन सेट',
    price: 50,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    description: 'Blue ink pen set of 5'
  },
  {
    id: 'gs3',
    name: 'Exercise Mat',
    nameMarathi: 'व्यायाम चटई',
    price: 150,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    description: 'Yoga and exercise mat'
  },
  {
    id: 'gs4',
    name: 'Cap',
    nameMarathi: 'टोपी',
    price: 80,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    description: 'Cotton baseball cap'
  }
]

export const groceryItems = [
  {
    id: 'gr1',
    name: 'Rice (1kg)',
    nameMarathi: 'तांदूळ (१ किलो)',
    price: 60,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    description: 'Premium basmati rice'
  },
  {
    id: 'gr2',
    name: 'Wheat Flour (1kg)',
    nameMarathi: 'गव्हाचे पीठ (१ किलो)',
    price: 45,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
    description: 'Fresh wheat flour'
  },
  {
    id: 'gr3',
    name: 'Onions (1kg)',
    nameMarathi: 'कांदे (१ किलो)',
    price: 30,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
    description: 'Fresh red onions'
  },
  {
    id: 'gr4',
    name: 'Tomatoes (1kg)',
    nameMarathi: 'टोमॅटो (१ किलो)',
    price: 40,
    image: 'https://images.unsplash.com/photo-1546470427-e5d491d121e4?w=400&h=400&fit=crop',
    description: 'Fresh ripe tomatoes'
  }
]

export const sampleFoodData = restaurants
