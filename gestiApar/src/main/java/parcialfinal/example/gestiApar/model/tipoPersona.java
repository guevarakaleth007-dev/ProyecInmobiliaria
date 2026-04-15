package parcialfinal.example.gestiApar.model;
//import java.time.LocalDate;//

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name = "TIPOPERSONA")
public class tipoPersona {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_tipopersona")
    @SequenceGenerator(name = "seq_tipopersona", sequenceName = "SEQ_TIPOPERSONA", allocationSize = 1)
    @Column(name = "IDTIPOPERSONA")
    private Long id;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    public  tipoPersona() {
    }

    public tipoPersona(String descripcion) {
        this.descripcion = descripcion;
    }

    

}