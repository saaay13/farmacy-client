import { Link } from "react-router-dom";
import { Pill } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 font-bold text-lg mb-4">
                            <Pill className="w-6 h-6" />
                            Farmacy Siempre Vivo
                        </div>
                        <p className="text-white/70 text-sm">
                            Tu farmacia de confianza para medicamentos y suplementos de calidad.
                        </p>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <h4 className="font-bold mb-4">Navegación</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/productos" className="hover:text-white transition-colors">
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link to="/categorias" className="hover:text-white transition-colors">
                                    Categorias
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="font-bold mb-4">Información</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>Horario: Lun - Dom 08:00 - 20:00</li>
                            <li>Teléfono: (555) 123-4567</li>
                            <li>Email: info@farmacare.com</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
                    <p>&copy; 2024 Farmacy Siempre Vivo. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
