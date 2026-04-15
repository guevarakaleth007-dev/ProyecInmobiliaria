package parcialfinal.example.gestiApar;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import parcialfinal.example.gestiApar.model.Perfil;
import parcialfinal.example.gestiApar.model.tipoPersona;
import parcialfinal.example.gestiApar.repository.PerfilRepository;
import parcialfinal.example.gestiApar.repository.tipoPersonaRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final PerfilRepository perfilRepository;
    private final tipoPersonaRepository tipoPersonaRepo;

    public DataInitializer(PerfilRepository perfilRepository,
                           tipoPersonaRepository tipoPersonaRepo) {
        this.perfilRepository = perfilRepository;
        this.tipoPersonaRepo = tipoPersonaRepo;
    }

    @Override
    public void run(String... args) {

        // Insertar perfiles base si la tabla está vacía
        if (perfilRepository.count() == 0) {
            Perfil admin = new Perfil();
            admin.setDescripcion("Administrador");
            perfilRepository.save(admin);

            Perfil usuario = new Perfil();
            usuario.setDescripcion("Usuario");
            perfilRepository.save(usuario);

            System.out.println("[DataInitializer] Perfiles base insertados.");
        }

        // Insertar tipos de persona base si la tabla está vacía
        if (tipoPersonaRepo.count() == 0) {
            tipoPersonaRepo.save(new tipoPersona("Cliente"));
            tipoPersonaRepo.save(new tipoPersona("Empleado"));
            tipoPersonaRepo.save(new tipoPersona("Propietario"));

            System.out.println("[DataInitializer] TipoPersona base insertados.");
        }
    }
}
