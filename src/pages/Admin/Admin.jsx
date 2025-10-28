"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    query, 
    onSnapshot, 
    doc, 
    setDoc, 
    addDoc, 
    deleteDoc, 
    getDoc 
} from 'firebase/firestore';
import { Home, Bed, Calendar, DollarSign, Image as ImageIcon, Menu, X, Plus } from 'lucide-react';

// --- CONFIGURATION ---
// IMPORTANT: These variables are provided by the canvas environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-hotel-admin';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
// --- END CONFIGURATION ---

const COLLECTIONS = {
    ROOMS: `artifacts/${appId}/public/data/hotel_rooms`,
    EVENTS: `artifacts/${appId}/public/data/hotel_events`,
    OFFERS: `artifacts/${appId}/public/data/hotel_offers`,
    BOOKINGS: `artifacts/${appId}/public/data/hotel_bookings`, // Assuming bookings are public data for admin
};

// ==============================================================================
// 1. UTILITY & CONTEXT
// ==============================================================================

const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-indigo-600">Loading Dashboard...</span>
    </div>
);

// ==============================================================================
// 2. ROOMS MANAGEMENT COMPONENT (CRUD Example)
// ==============================================================================

const RoomsManager = ({ db, rooms }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [formData, setFormData] = useState({ 
        name: '', 
        capacity: 2, 
        price: 150.00, 
        description: '', 
        imageUrl: 'https://placehold.co/600x400/5C6BC0/ffffff?text=Room+Image' 
    });

    const roomCollectionRef = collection(db, COLLECTIONS.ROOMS);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseFloat(value) : value 
        }));
    };

    const handleEdit = (room) => {
        setCurrentRoom(room);
        setFormData(room);
        setIsModalOpen(true);
    };

    const handleCreateNew = () => {
        setCurrentRoom(null);
        setFormData({ 
            name: '', 
            capacity: 2, 
            price: 150.00, 
            description: '', 
            imageUrl: 'https://placehold.co/600x400/5C6BC0/ffffff?text=New+Room' 
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentRoom) {
                // UPDATE
                const roomDocRef = doc(db, COLLECTIONS.ROOMS, currentRoom.id);
                await setDoc(roomDocRef, formData, { merge: true });
                console.log("Room updated successfully:", currentRoom.id);
            } else {
                // CREATE
                await addDoc(roomCollectionRef, { ...formData, createdAt: new Date() });
                console.log("Room added successfully.");
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving room:", error);
        }
    };

    const handleDelete = async (roomId) => {
        if (window.confirm("Are you sure you want to delete this room? This cannot be undone.")) {
            try {
                const roomDocRef = doc(db, COLLECTIONS.ROOMS, roomId);
                await deleteDoc(roomDocRef);
                console.log("Room deleted successfully:", roomId);
            } catch (error) {
                console.error("Error deleting room:", error);
            }
        }
    };

    const Modal = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-indigo-700">{currentRoom ? 'Edit Room' : 'Add New Room'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 p-1">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField name="name" label="Room Name" value={formData.name} onChange={handleInputChange} required />
                    <InputField name="capacity" label="Capacity (Guests)" type="number" value={formData.capacity} onChange={handleInputChange} min="1" required />
                    <InputField name="price" label="Price per Night ($)" type="number" value={formData.price} onChange={handleInputChange} step="0.01" required />
                    <InputField name="imageUrl" label="Image URL" value={formData.imageUrl} onChange={handleInputChange} />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
                    >
                        {currentRoom ? 'Save Changes' : 'Create Room'}
                    </button>
                </form>
            </div>
        </div>
    );

    const InputField = ({ label, name, type = 'text', value, onChange, ...props }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                {...props}
            />
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Room Management ({rooms.length})</h1>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                >
                    <Plus size={20} className="mr-2" /> Add New Room
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-[1.02]">
                        <img 
                            src={room.imageUrl} 
                            alt={room.name} 
                            className="w-full h-48 object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/BDBDBD/424242?text=Image+Not+Found"; }}
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-900 truncate">{room.name}</h2>
                            <p className="text-indigo-600 font-bold mt-1">${room.price.toFixed(2)} / night</p>
                            <p className="text-sm text-gray-500 mb-4">Capacity: {room.capacity} Guests</p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(room)}
                                    className="flex-1 bg-teal-500 text-white py-2 rounded-lg text-sm hover:bg-teal-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(room.id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <Modal />}
        </div>
    );
};


// ==============================================================================
// 3. OTHER MANAGERS (SKELETONS)
// ==============================================================================

const EventsManager = ({ db }) => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [formData, setFormData] = useState({ 
        name: '', 
        date: new Date().toISOString().substring(0, 10),
        description: '', 
        imageUrl: 'https://placehold.co/600x400/10B981/ffffff?text=Event+Image'
    });

    useEffect(() => {
        if (!db) return;
        const unsubscribe = onSnapshot(collection(db, COLLECTIONS.EVENTS), (snapshot) => {
            const fetchedEvents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => (a.date > b.date) ? 1 : -1);
            setEvents(fetchedEvents);
        });
        return unsubscribe;
    }, [db]);

    const eventCollectionRef = collection(db, COLLECTIONS.EVENTS);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (event) => {
        setCurrentEvent(event);
        setFormData(event);
        setIsModalOpen(true);
    };

    const handleCreateNew = () => {
        setCurrentEvent(null);
        setFormData({ 
            name: '', 
            date: new Date().toISOString().substring(0, 10),
            description: '', 
            imageUrl: 'https://placehold.co/600x400/10B981/ffffff?text=Event+Image' 
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEvent) {
                const eventDocRef = doc(db, COLLECTIONS.EVENTS, currentEvent.id);
                await setDoc(eventDocRef, formData, { merge: true });
            } else {
                await addDoc(eventCollectionRef, { ...formData, createdAt: new Date() });
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                const eventDocRef = doc(db, COLLECTIONS.EVENTS, eventId);
                await deleteDoc(eventDocRef);
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };
    
    const Modal = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-indigo-700">{currentEvent ? 'Edit Event' : 'Add New Event'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 p-1">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField name="name" label="Event Name" value={formData.name} onChange={handleInputChange} required />
                    <InputField name="date" label="Event Date" type="date" value={formData.date} onChange={handleInputChange} required />
                    <InputField name="imageUrl" label="Image URL" value={formData.imageUrl} onChange={handleInputChange} />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
                    >
                        {currentEvent ? 'Save Changes' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
    
    const InputField = ({ label, name, type = 'text', value, onChange, ...props }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                {...props}
            />
        </div>
    );


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Event Management ({events.length})</h1>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                >
                    <Plus size={20} className="mr-2" /> Add New Event
                </button>
            </div>
            
            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="bg-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between transition transform hover:shadow-xl">
                         <div className="flex items-center space-x-4 flex-grow">
                             <img 
                                src={event.imageUrl} 
                                alt={event.name} 
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0" 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/10B981/ffffff?text=Event"; }}
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">{event.name}</h2>
                                <p className="text-sm text-indigo-600 font-medium">Date: {event.date}</p>
                                <p className="text-sm text-gray-500 truncate max-w-xs">{event.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-3 sm:mt-0 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(event)}
                                className="bg-teal-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-teal-600 transition shadow-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(event.id)}
                                className="bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <Modal />}
        </div>
    );
};

const OffersManager = ({ db }) => {
    const [offers, setOffers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOffer, setCurrentOffer] = useState(null);
    const [formData, setFormData] = useState({ 
        title: '', 
        discount: 15, // percentage
        validUntil: new Date(Date.now() + 86400000 * 30).toISOString().substring(0, 10), // 30 days from now
        description: '', 
        code: ''
    });

    useEffect(() => {
        if (!db) return;
        const unsubscribe = onSnapshot(collection(db, COLLECTIONS.OFFERS), (snapshot) => {
            const fetchedOffers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOffers(fetchedOffers);
        });
        return unsubscribe;
    }, [db]);

    const offersCollectionRef = collection(db, COLLECTIONS.OFFERS);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseFloat(value) : value 
        }));
    };

    const handleEdit = (offer) => {
        setCurrentOffer(offer);
        setFormData(offer);
        setIsModalOpen(true);
    };

    const handleCreateNew = () => {
        setCurrentOffer(null);
        setFormData({ 
            title: '', 
            discount: 15,
            validUntil: new Date(Date.now() + 86400000 * 30).toISOString().substring(0, 10),
            description: '', 
            code: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentOffer) {
                const offerDocRef = doc(db, COLLECTIONS.OFFERS, currentOffer.id);
                await setDoc(offerDocRef, formData, { merge: true });
            } else {
                await addDoc(offersCollectionRef, { ...formData, createdAt: new Date() });
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving offer:", error);
        }
    };

    const handleDelete = async (offerId) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            try {
                const offerDocRef = doc(db, COLLECTIONS.OFFERS, offerId);
                await deleteDoc(offerDocRef);
            } catch (error) {
                console.error("Error deleting offer:", error);
            }
        }
    };
    
    const Modal = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-indigo-700">{currentOffer ? 'Edit Offer' : 'Add New Offer'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 p-1">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField name="title" label="Offer Title" value={formData.title} onChange={handleInputChange} required />
                    <InputField name="discount" label="Discount (%)" type="number" value={formData.discount} onChange={handleInputChange} min="1" max="100" required />
                    <InputField name="code" label="Promotion Code (Optional)" value={formData.code} onChange={handleInputChange} />
                    <InputField name="validUntil" label="Valid Until" type="date" value={formData.validUntil} onChange={handleInputChange} required />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
                    >
                        {currentOffer ? 'Save Changes' : 'Create Offer'}
                    </button>
                </form>
            </div>
        </div>
    );
    
    const InputField = ({ label, name, type = 'text', value, onChange, ...props }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                {...props}
            />
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Offers & Promotions ({offers.length})</h1>
                <button
                    onClick={handleCreateNew}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                >
                    <Plus size={20} className="mr-2" /> Add New Offer
                </button>
            </div>
            
            <div className="space-y-4">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-between transition transform hover:shadow-xl border-l-8 border-yellow-500">
                        <div>
                            <div className='flex items-center space-x-2'>
                                <h2 className="text-xl font-bold text-gray-900">{offer.title}</h2>
                                {offer.code && <span className='text-xs font-mono bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full'>{offer.code}</span>}
                            </div>
                            <p className="text-indigo-600 font-bold text-sm mt-1">{offer.discount}% OFF</p>
                            <p className="text-sm text-gray-500">Valid Until: {offer.validUntil}</p>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(offer)}
                                className="bg-teal-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-teal-600 transition shadow-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(offer.id)}
                                className="bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <Modal />}
        </div>
    );
};

const MediaManager = ({ db }) => {
    const [heroImageUrl, setHeroImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const CONFIG_DOC_PATH = `artifacts/${appId}/public/data/hotel_config/hero_image`;

    const fetchConfig = useCallback(async () => {
        setIsLoading(true);
        try {
            const docRef = doc(db, CONFIG_DOC_PATH);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setHeroImageUrl(docSnap.data().url || '');
            } else {
                setHeroImageUrl('https://placehold.co/1200x400/3B82F6/ffffff?text=Default+Hero+Image');
            }
        } catch (error) {
            console.error("Error fetching hero image config:", error);
        } finally {
            setIsLoading(false);
        }
    }, [db]);

    useEffect(() => {
        if (db) {
            fetchConfig();
        }
    }, [db, fetchConfig]);

    const handleSave = async () => {
        if (!heroImageUrl || !db) return;
        try {
            const docRef = doc(db, CONFIG_DOC_PATH);
            await setDoc(docRef, { url: heroImageUrl, lastUpdated: new Date() }, { merge: true });
            console.log("Hero Image URL saved successfully.");
            alert("Hero Image URL updated!"); // Using an alert replacement for success feedback
        } catch (error) {
            console.error("Error saving hero image URL:", error);
            alert("Failed to update Hero Image URL.");
        }
    };

    const handleInputChange = (e) => {
        setHeroImageUrl(e.target.value);
    };

    if (isLoading) return <LoadingSpinner />;


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Media & Hero Section Images</h1>
            
            <div className="bg-indigo-50 p-6 rounded-xl shadow-lg space-y-4">
                <h2 className='text-xl font-medium text-indigo-700'>Main Hero Image URL</h2>
                <p className="text-sm text-gray-500">
                    This URL typically sets the main banner image on your hotel's homepage. This field updates the document at 
                    <code className='bg-gray-200 text-gray-700 p-1 rounded text-xs block mt-1 break-all'>{CONFIG_DOC_PATH}</code>.
                </p>
                <input 
                    type="url" 
                    value={heroImageUrl} 
                    onChange={handleInputChange}
                    placeholder="Enter new Hero Image URL"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button 
                    onClick={handleSave}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
                >
                    Save Hero Image URL
                </button>
            </div>

            <div className='mt-6'>
                <h2 className='text-xl font-medium text-gray-800 mb-2'>Preview:</h2>
                <div className='w-full h-64 bg-gray-300 rounded-xl overflow-hidden shadow-lg'>
                    <img 
                        src={heroImageUrl} 
                        alt="Hero Section Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x400/EF4444/ffffff?text=Invalid+Image+URL"; }}
                    />
                </div>
            </div>

        </div>
    );
};

// ==============================================================================
// 4. MAIN APPLICATION COMPONENT
// ==============================================================================

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, toggleSidebar }) => {
    const navItems = [
        { id: 'Rooms', label: 'Rooms', icon: Bed },
        { id: 'Bookings', label: 'Bookings', icon: Home },
        { id: 'Events', label: 'Events', icon: Calendar },
        { id: 'Offers', label: 'Offers', icon: DollarSign },
        { id: 'Media', label: 'Media', icon: ImageIcon },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar}></div>
            )}
            
            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-900 text-white flex flex-col z-40 shadow-xl`}
            >
                <div className="p-6 text-xl font-bold border-b border-gray-800 flex items-center justify-between">
                    Hotel Admin
                    <button onClick={toggleSidebar} className="lg:hidden p-1 rounded hover:bg-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); toggleSidebar(false); }}
                                className={`flex items-center w-full px-4 py-3 rounded-xl transition duration-150 ${
                                    isActive 
                                        ? 'bg-indigo-600 text-white shadow-lg' 
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <Icon size={20} className="mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
                <div className="p-6 text-sm text-gray-500 border-t border-gray-800">
                    User ID: <span className="text-gray-400 break-all">{localStorage.getItem('adminUserId') || 'Authenticating...'}</span>
                </div>
            </aside>
        </>
    );
};

export default function Admin() {
    const [activeTab, setActiveTab] = useState('Rooms');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);

    const toggleSidebar = (forceClose = null) => {
        setIsSidebarOpen(prev => forceClose !== null ? forceClose : !prev);
    };


    // --- FIREBASE INITIALIZATION & AUTH ---
    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                const app = initializeApp(firebaseConfig);
                const firestore = getFirestore(app);
                const authInstance = getAuth(app);
                setDb(firestore);
                setAuth(authInstance);

                const unsubscribeAuth = onAuthStateChanged(authInstance, async (user) => {
                    if (user) {
                        setUserId(user.uid);
                        localStorage.setItem('adminUserId', user.uid);
                    } else {
                        // Attempt to sign in with custom token or anonymously
                        try {
                            if (initialAuthToken) {
                                await signInWithCustomToken(authInstance, initialAuthToken);
                            } else {
                                // Fallback to anonymous sign-in if no token is provided
                                await signInAnonymously(authInstance);
                            }
                        } catch (e) {
                            console.error("Authentication failed:", e);
                            // If auth fails, still allow UI to load, but data ops will fail
                            setIsLoading(false); 
                        }
                    }
                });

                // Clean up auth listener
                return () => unsubscribeAuth();
            } catch (error) {
                console.error("Firebase initialization failed:", error);
                // Handle the error gracefully in the UI
                setIsLoading(false);
            }
        };

        initializeFirebase();
    }, []);

    // --- FIREBASE DATA LISTENERS ---
    useEffect(() => {
        if (!db || !userId) return;

        // Listener for Rooms
        const unsubscribeRooms = onSnapshot(collection(db, COLLECTIONS.ROOMS), (snapshot) => {
            const fetchedRooms = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => (a.createdAt?.toDate() || 0) - (b.createdAt?.toDate() || 0)); // Simple sort by creation date
            setRooms(fetchedRooms);
            console.log(`Fetched ${fetchedRooms.length} rooms.`);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching rooms:", error);
            setIsLoading(false);
        });

        // Listener for Bookings (Skeleton)
        const unsubscribeBookings = onSnapshot(collection(db, COLLECTIONS.BOOKINGS), (snapshot) => {
            const fetchedBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBookings(fetchedBookings);
            console.log(`Fetched ${fetchedBookings.length} bookings.`);
        }, (error) => {
            console.warn("Error fetching bookings:", error);
        });

        // Clean up listeners
        return () => {
            unsubscribeRooms();
            unsubscribeBookings();
        };
    }, [db, userId]);


    // --- RENDER CONTENT BASED ON ACTIVE TAB ---
    const renderContent = () => {
        if (isLoading || !db) return <LoadingSpinner />;

        switch (activeTab) {
            case 'Rooms':
                return <RoomsManager db={db} rooms={rooms} />;
            case 'Bookings':
                return (
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Management ({bookings.length})</h1>
                        <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500 text-blue-800">
                            <p className="font-semibold">Current Bookings List (Data Listener Active)</p>
                            <p className="text-sm">Implement a table here to view, confirm, and cancel bookings from the `{COLLECTIONS.BOOKINGS}` collection.</p>
                        </div>
                        <div className="mt-4 space-y-2">
                            {bookings.slice(0, 5).map(b => (
                                <div key={b.id} className='p-3 bg-white rounded-lg shadow-sm text-sm'>Booking ID: {b.id.substring(0, 8)}... - Room: {b.roomId || 'N/A'}</div>
                            ))}
                        </div>
                    </div>
                );
            case 'Events':
                return <EventsManager db={db} />;
            case 'Offers':
                return <OffersManager db={db} />;
            case 'Media':
                return <MediaManager db={db} />;
            default:
                return <div className="p-6 text-xl">Select a management tab.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            <style>{`
                /* Ensure responsive layout */
                @media (min-width: 1024px) {
                    .content-area {
                        width: calc(100% - 16rem); /* Full width minus 64 (w-64) for sidebar */
                    }
                }
            `}</style>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button 
                    onClick={() => toggleSidebar()} 
                    className="p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
                >
                    <Menu size={24} />
                </button>
            </div>
            
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar}
            />

            <main className="flex-grow content-area pt-20 lg:pt-0 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
}
